import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { SEO } from '@/components/SEO'

export const CallbackPage: React.FC = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <>
        <SEO 
          title="Authentication Error"
          description="An error occurred during authentication."
          noindex={true}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
            <div className="text-gray-600">
              <p className="mb-4">An error occurred during authentication:</p>
              <p className="text-sm bg-red-50 p-3 rounded border text-red-700">
                {error.message}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Completing Sign In"
        description="Completing your authentication to Pittsburgh Tomorrow."
        noindex={true}
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Completing authentication...</p>
        </div>
      </div>
    </>
  );
};
