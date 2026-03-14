import React from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * @name AuthGuard
 * @description A high-order component to protect routes using Azure AD (MSAL).
 * It handles the "Silent Login" flow and redirect logic automatically.
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error("SSO Login Error:", e);
    });
  };

  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-bold">Session Expired</h2>
          <p className="text-gray-500 mb-4">
            Please sign in to access this enterprise resource.
          </p>
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign in with Microsoft
          </button>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};
