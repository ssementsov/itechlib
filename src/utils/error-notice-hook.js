import { useSnackbar } from "notistack";

export const useErrorNotice = () => {
   const { enqueueSnackbar } = useSnackbar();

   const setMainError = () => {
      enqueueSnackbar("Something went wrong... Please retry.", {
         variant: "error",
      });
   };

   return [setMainError];
};
