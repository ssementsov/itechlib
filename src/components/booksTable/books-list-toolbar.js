import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import AddNewBookModal from "../AddNewBook/AddNewBookModal";
import { MAIN_CATALOGUE_PATH } from "../../common/constants/route-constants";

export const BooksListToolbar = ({ onCreate }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().max(
        255,
        "Search request must be less than 255 characters"
      ),
    }),
    onSubmit: () => {
      router.push(MAIN_CATALOGUE_PATH);
    },
  });

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Main catalogue
        </Typography>
        <Box sx={{ m: 1, display: "flex" }}>
          <Button sx={{ mr: 1 }}>Suggest a book</Button>
          <AddNewBookModal onCreate={onCreate} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="search"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.search}
                  error={Boolean(formik.touched.search && formik.errors.search)}
                  helperText={formik.touched.search && formik.errors.search}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search a book"
                  variant="outlined"
                />
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
