import React, { createContext, useState, useContext } from "react";

// Create Modal Context
export const ModalContext = createContext();

// Modal Context Provider Component
export const ModalProvider = ({ children }) => {
  const InitialState = null;
  const [modalContent, setModalContent] = useState(InitialState);

  // Function to open a modal
  const openModal = (content) => {
    setModalContent(content);
  };

  // Function to close the modal
  const closeModal = () => {
    if(!InitialState){
    setModalContent(InitialState);
    }
    return;
  };

  return (
    <ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

