import React, { createContext, useContext, useState } from 'react';

// Create the Modal Context
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);



const modalContextProvider = ({ children }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default modalContextProvider;