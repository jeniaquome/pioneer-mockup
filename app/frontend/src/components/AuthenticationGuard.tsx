import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

interface PageLoaderProps {}

const PageLoader: React.FC<PageLoaderProps> = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
  </div>
);

interface AuthenticationGuardProps {
  component: React.ComponentType<any>;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
