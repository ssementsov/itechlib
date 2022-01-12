import React from "react";
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
import AddOrEditBookModal from "../add-or-edit-book-modal";
import { typeModal } from "../../common/constants/modal-type-constants";

export const BooksListToolbar = ({ createBook, setSearch, search }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          <Button onClick={handleOpen} color="primary" variant="contained">
            Add a book
          </Button>
          <AddOrEditBookModal
            type={typeModal.add}
            createBook={createBook}
            open={open}
            handleClose={handleClose}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                name="search"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
