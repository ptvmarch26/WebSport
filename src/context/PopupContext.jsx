import { createContext, useContext, useState, useCallback } from "react";
import PopupComponent from "../components/PopupComponent/PopupComponent";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    message: "",
    isSuccess: true,
    show: false,
    timeout: 2000,
  });

  const showPopup = useCallback((message, isSuccess = true, timeout = 2000) => {
    setPopup({ message, isSuccess, show: true, timeout });
  }, []);

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup.show && (
        <PopupComponent
          message={popup.message}
          isSuccess={popup.isSuccess}
          timeout={popup.timeout}
          onClose={closePopup}
        />
      )}
    </PopupContext.Provider>
  );
};
