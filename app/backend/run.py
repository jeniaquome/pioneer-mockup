import os
from typing import Tuple

from fastapi.staticfiles import StaticFiles
from main import app
    
# Run Auth0 migrations on startup (idempotent)
print("🔐 Running Auth0 migrations on startup...")
auth0_migrations = [
    ("migration_add_auth0_user_id", "Auth0 user ID column"),
    ("migration_make_password_nullable", "Password nullable"),
    ("migration_make_username_nullable", "Username nullable"),
    ("migration_remove_username_unique", "Username unique constraint removal")
]

for migration_module, description in auth0_migrations:
    try:
        print(f"Running {description} migration...")
        migration = __import__(migration_module)
        migration.run_migration()
        print(f"✅ {description} migration completed")
    except Exception as e:
        print(f"❌ {description} migration failed: {e}")
        print("This may cause Auth0 login issues if columns are missing")
        # Don't exit - continue with the app startup

# Initialize demo data if environment variables are set
INIT_DEMO_DATA = os.environ.get("INIT_DEMO_DATA", "false").lower() == "true"
INIT_DEMO_DATA_MODE = os.environ.get("INIT_DEMO_DATA_MODE", "full").lower()
INIT_DEMO_USERS = os.environ.get("INIT_DEMO_USERS", "false").lower() == "true"
CLEAR_DEMO_DATA = os.environ.get("CLEAR_DEMO_DATA", "false").lower() == "true"

if CLEAR_DEMO_DATA:
    print("🗑️ Clearing demo data on startup...")
    try:
        from demo_service import clear_all_data
        clear_all_data()
        print("✅ Demo data cleared successfully!")
    except Exception as e:
        print(f"❌ Failed to clear demo data: {e}")

if INIT_DEMO_DATA:
    print("🚀 Initializing demo data on startup...")
    try:
        if INIT_DEMO_DATA_MODE == "no-resources":
            from demo_service import run_demo_setup_without_resources
            run_demo_setup_without_resources()
        else:
            from demo_service import run_demo_setup
            run_demo_setup()
        print("✅ Demo data initialized successfully!")
    except Exception as e:
        print(f"❌ Failed to initialize demo data: {e}")
        # Don't exit - continue with the app startup

# Allow initializing only demo users without resources when INIT_DEMO_USERS=true and INIT_DEMO_DATA is false
if INIT_DEMO_USERS and not INIT_DEMO_DATA:
    print("👥 Initializing demo users on startup (without demo resources)...")
    try:
        from demo_service import populate_demo_users
        populate_demo_users()
        print("✅ Demo users initialized successfully!")
    except Exception as e:
        print(f"❌ Failed to initialize demo users: {e}")

STATIC_WEB_DIR = os.environ.get("STATIC_WEB_DIR", "./static")

print(f"Mounting static website from {STATIC_WEB_DIR}")


class SinglePageApplication(StaticFiles):
    """Acts similar to the bripkens/connect-history-api-fallback
    NPM package."""

    def __init__(self, directory: os.PathLike, index="index.html") -> None:
        self.index = index

        # set html=True to resolve the index even when no
        # the base path is passed in
        super().__init__(directory=directory, packages=None, html=True, check_dir=True)

    def lookup_path(self, path: str) -> Tuple[str, os.stat_result]:
        """Returns the index file when no match is found.

        Args:
            path (str): Resource path.

        Returns:
            [tuple[str, os.stat_result]]: Always retuens a full path and stat result.
        """
        full_path, stat_result = super().lookup_path(path)

        # if a file cannot be found
        if stat_result is None:
            return super().lookup_path(self.index)

        return (full_path, stat_result)


app.mount(path="/", app=SinglePageApplication(directory=STATIC_WEB_DIR), name="SPA")


# Railway provides PORT environment variable, fallback to BACKEND_PORT for local dev
BACKEND_PORT = int(os.environ.get("PORT", os.environ.get("BACKEND_PORT", 8000)))
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=BACKEND_PORT)
