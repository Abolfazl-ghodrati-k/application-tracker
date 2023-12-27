// Login.js

import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log("Error occured during sign up: ", error);
      return;
    } else if (data?.user) {
      setUser(data?.user);
      console.log("User signed up successfully * ", data);
    }
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Error occured during sign in: ", error);
      return;
    } else if (data?.user) {
      setUser(data?.user);
      console.log("User signed in successfully * ", data);
    }
  };

  const handleAuth = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleSignIn();
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-full mb-4"
          onClick={handleAuth}
        >
          {loading ? "loading" : isSignUp ? "Sign Up" : "Login"}
        </button>
        <p className="text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            className="text-blue-500 underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
