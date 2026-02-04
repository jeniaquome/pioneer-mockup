from fastapi import APIRouter

router = APIRouter()

@router.get("/", summary="Get information about the project, partners, and mission.")
def get_about():
    return {
        "title": "Pittsburgh Tomorrow Pioneer: Newcomer Roadmap",
        "description": "A project to help newcomers settle in Pittsburgh and Allegheny County with tailored resources and checklists.",
        "partners": ["Partner Org 1", "Partner Org 2"],
        "contact_email": "Hello@pittsburghtomorrow.org"
    }
