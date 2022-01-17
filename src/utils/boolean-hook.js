import { useCallback, useState } from "react";

export const useBoolean = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const toggle = useCallback(() => setOpen((state) => !state), []);

  return [open, toggle];
};
