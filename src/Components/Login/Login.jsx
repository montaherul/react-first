import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.int";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log("User Info:", loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* 1. Logo / Brand Header (Visible on both states) */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
          {/* Placeholder Logo Icon */}
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {user ? "Welcome Back" : "Sign in to your account"}
        </h2>
        {!user && (
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{" "}
            <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              start your 14-day free trial
            </span>
          </p>
        )}
      </div>

      {/* 2. Main Card Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl ring-1 ring-slate-900/5 rounded-xl sm:px-10">
          {user ? (
            /* ---------------- LOGGED IN STATE ---------------- */
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar with ring */}
                <div className="relative">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold border-4 border-indigo-50">
                      {user.displayName ? user.displayName.charAt(0) : "U"}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                </div>

                {/* User Info */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {user.displayName || "User"}
                  </h3>
                  {user.email && (
                    <p className="text-sm text-slate-500 font-medium">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={handleSignOut}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* ---------------- LOGGED OUT STATE ---------------- */
            <div>
              <div className="space-y-6">
                {/* Google Sign In Button */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-4">
                    Sign in with
                  </p>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex justify-center items-center px-4 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    {/* Google SVG Logo */}
                    <svg
                      className="h-5 w-5 mr-3"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.63c1.61 0 3.02.55 4.13 1.62L19.16 3.16C17.27 1.4 14.84 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">
                      Secure Authentication
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
