import { useState } from 'react';

export const useBoolean = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const setOpen = (e) => {
        if(e) e.stopPropagation();
        setIsOpen(true);
    };
    const setClose = (e) => {
        if(e) e.stopPropagation();
        setIsOpen(false);
    };

    return [isOpen, setOpen, setClose];
};
