import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { titles } from './../../common/constants/titles-constants'
import { styled } from '@mui/material/styles'
import { withSnackbar } from 'notistack'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useRouter } from 'next/router'
import { MAIN_CATALOGUE_PATH } from '../../common/constants/route-constants'
import CustomModal from './../custom-modal'
import api from '../../api/books'

function toLowerCaseExeptFirstLetter(string) {
  return string[0] + string.slice(1).toLowerCase()
}

const TblCell = styled(TableCell)(() => ({
  textAlign: 'left',
  cursor: 'auto',
  borderBottom: '1px solid #E7E8EF',
  borderTop: '1px solid #E7E8EF',
  padding: '5px 35px',
}))

const BookDetails = ({ book, enqueueSnackbar }) => {
  const router = useRouter()

  const deleteBook = async () => {
    try {
      await api.delete(`/api/books/${book.id}`)
      router.replace(MAIN_CATALOGUE_PATH)
      enqueueSnackbar('Your book has been deleted successfully!', {
        variant: 'success',
      })
    } catch (e) {
      enqueueSnackbar('Something went wrong... Please retry.', {
        variant: 'error',
      })
    }
  }

  const editBook = async (body) => {
    try {
      const docRef = doc(db, 'books', book.idBook)
      const bookUpdated = { ...body, timestamp: serverTimestamp() }
      await updateDoc(docRef, bookUpdated)
      enqueueSnackbar('Your book has been updated successfully!', {
        variant: 'success',
      })
    } catch (e) {
      enqueueSnackbar('Something went wrong... Please retry.', {
        variant: 'error',
      })
    }
  }

  return (
    <Card>
      <CardHeader
        title={book.title}
        action={
          <>
            <CustomModal whatModal={'delete book'} deleteBook={deleteBook} />
            <CustomModal
              whatModal={'edit book'}
              editBook={editBook}
              book={book}
            />
          </>
        }
      />
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TblCell>{titles.author}</TblCell>
                  <TblCell>{book.author}</TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.category}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.category.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.language}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.language.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.link}</TblCell>
                  <TblCell>
                    <Link
                      href={book.link}
                      underline="hover"
                      target="_blank"
                      rel="noopener"
                    >
                      {'Open site'}
                    </Link>
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.rating}</TblCell>
                  <TblCell>
                    <Rating
                      name="read-only"
                      value={book.rating}
                      size="small"
                      readOnly
                      sx={{
                        marginLeft: '-3px',
                      }}
                    />
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.status}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.status.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.description}</TblCell>
                  <TblCell>{book.description}</TblCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button color="primary" variant="contained">
          Assign to me
        </Button>
      </Box>
    </Card>
  )
}

export default withSnackbar(BookDetails)
