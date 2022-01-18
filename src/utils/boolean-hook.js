import { useState } from "react";

export const useBoolean = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const setOpen = () => {
    setIsOpen(true);
  };
  const setClose = () => {
    setIsOpen(false);
  };

  return [isOpen, setOpen, setClose];
};
