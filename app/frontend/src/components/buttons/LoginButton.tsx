import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@/components/ui/button";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button 
      className="btn-brand-primary w-full text-base transition-transform duration-200 hover:scale-105" 
      onClick={handleLogin}
      style={{ minHeight: '48px' }}
    >
      Log In
    </Button>
  );
};
