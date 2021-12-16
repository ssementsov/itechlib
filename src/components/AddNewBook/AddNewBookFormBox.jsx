import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { CloseIcon } from "../../icons/close-icon";
import AddNewBookForm from "./AddNewBookForm";
import { status } from "../../common/constants/status-constants";
import { MAIN_CATALOGUE_PATH } from "../../common/constants/route-constants";

const AddNewBookFormBox = ({
  handleClose,
  createBook,
  editBook,
  title,
  buttonName,
  book,
}) => {
  const router = useRouter();
  let newBook;

  if (book) {
    newBook = book.dateTo
      ? {
          ...book,
          dateTo: new Date(book.dateTo.seconds * 1000),
          dateFrom: new Date(book.dateFrom.seconds * 1000),
        }
      : book;
  } else {
    newBook = {
      title: "",
      author: "",
      category: "",
      language: "",
      description: "",
      linkToWeb: "",
      status: "",
      reader: "",
      dateFrom: null,
      dateTo: null,
    };
  }

  function validate(value) {
    let error = {};
    if (
      value.linkToWeb &&
      !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
        value.linkToWeb
      )
    ) {
      error.linkToWeb = "Please enter correct link";
    } else if (value.status === status.inUse) {
      if (!value.reader) {
        error.reader = "Reader is required";
      }
      if (!value.dateFrom) {
        error.dateFrom = "Date is required";
      }
      if (!value.dateTo) {
        error.dateTo = "Date is required";
      }
    }

    return error;
  }

  const formik = useFormik({
    initialValues: newBook,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Title must be more than 2 characters")
        .max(255, "Title must be less than 255 characters")
        .required("Title is required"),
      author: Yup.string()
        .min(2, "Author must be more than 2 characters")
        .max(255, "Author must be less than 255 characters")
        .required("Author is required"),
      category: Yup.string().required("Category is required"),
      language: Yup.string().required("Language is required"),
      description: Yup.string()
        .min(10, "Description must be more than 10 characters")
        .max(100, "Description must be less than 100 characters")
        .required("Description is required"),
      status: Yup.string().required("Status is required"),
    }),
    validate,
    onSubmit: async (values) => {
      if ("timestamp" in values) {
        await editBook(values);
        handleClose();
      } else {
        await createBook(values);
        handleClose();
        router.push(MAIN_CATALOGUE_PATH);
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              position: "absolute",
              right: 22,
              top: 22,
              cursor: "pointer",
            }}
          >
            <CloseIcon
              onClick={handleClose}
              sx={{
                justifySelf: "flex-end",
              }}
            />
          </Box>
          <AddNewBookForm
            formik={formik}
            title={title}
            buttonName={buttonName}
          />
        </Container>
      </Box>
    </>
  );
};

export default AddNewBookFormBox;
