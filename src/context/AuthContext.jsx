import { createContext, useContext, useState, useEffect } from "react";
import {
  signUp,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  loginWithGoogle,
} from "../services/api/AuthApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  
  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const handleSignUp = async (user_name, email, password) => {
    const data = await signUp(user_name, email, password);
    console.log(data);
    return data;
  };

  const handleLogin = async (user_name, password) => {
    const data = await login(user_name, password);
    if (data?.result?.accessToken && data?.result?.refreshToken) {
      setToken(data?.result?.accessToken);
      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("refreshToken", data.result.refreshToken);
    }
    return data;
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const handleSendOTP = async (email) => {
    return await sendOTP(email);
  };

  const handleVerifyOTP = async (email, otp) => {
    return await verifyOTP(email, otp);
  };

  const handleResetPassword = async (email, newPassword) => {
    return await resetPassword(email, newPassword);
  };

  const handlLoginWithGoogle = async () => {
    const data = await loginWithGoogle();
    if (data?.result?.accessToken) {
      setToken(data?.result?.accessToken);
      localStorage.setItem("accessToken", data.result.accessToken);
    }

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        handleSignUp,
        handleLogin,
        handleLogout,
        handleSendOTP,
        handleVerifyOTP,
        handleResetPassword,
        handlLoginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
