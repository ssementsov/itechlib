import { useSnackbar } from "notistack";
import { useCallback } from "react";

export const useCustomSnackbar = () => {
   const { enqueueSnackbar } = useSnackbar();

   const defaultErrorSnackbar = useCallback(() => {
      enqueueSnackbar("Something went wrong... Please retry.", {
         variant: "error",
      });
   }, [enqueueSnackbar]);

   return [enqueueSnackbar, defaultErrorSnackbar];
};
