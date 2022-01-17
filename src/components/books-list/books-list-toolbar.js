import React from "react";
import PropTypes from "prop-types";
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
import AddBookModal from "./../book/add-edit-book/add-book-modal";

const BooksListToolbar = (props) => {
  const { onCreate, setSearch, search, open, setOpen, setClose } = props;

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
          <Button onClick={setOpen} color="primary" variant="contained">
            Add a book
          </Button>
          <AddBookModal onCreate={onCreate} open={open} setClose={setClose} />
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

BooksListToolbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default BooksListToolbar;
