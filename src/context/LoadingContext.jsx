import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Đang tải...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const setLoading = (loading, customMessage = "Đang tải...") => {
    setIsLoading(loading);
    setMessage(customMessage);
  };

  const value = useMemo(
    () => ({ isLoading, setLoading }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          isLoading ? (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-lg">{message}</p>
              </div>
            </div>
          ) : null,
          document.body
        )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
    