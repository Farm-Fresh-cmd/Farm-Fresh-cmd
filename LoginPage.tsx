import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "sans-serif" }}>Login or Sign Up</h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-lg border border-gray-200">
        <p className="text-center text-gray-700" style={{ fontFamily: "serif" }}>
          This is a placeholder for the login and sign-up form.
        </p>
        <p className="text-center text-gray-500 text-sm" style={{ fontFamily: "serif" }}>
          Full authentication functionality will be implemented later.
        </p>
        {/* Placeholder for form elements */}
      </div>
    </div>
  );
};

export default LoginPage;
