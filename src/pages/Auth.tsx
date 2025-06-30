
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Simulate login logic
    console.log("Login attempt:", { email, password });
    
    // Store user data in localStorage (in a real app, you'd use proper JWT tokens)
    localStorage.setItem("user", JSON.stringify({ email, name: "User" }));
    
    toast.success("Login successful!");
    navigate("/");
  };

  const handleSignup = (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // Simulate signup logic
    console.log("Signup attempt:", userData);
    
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify({ 
      email: userData.email, 
      name: userData.name,
      phone: userData.phone 
    }));
    
    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
