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

const TblCell = styled(TableCell)(() => ({
  textAlign: 'left',
  cursor: 'auto',
  borderBottom: '1px solid #E7E8EF',
  borderTop: '1px solid #E7E8EF',
  padding: '5px 35px',
}))

export const BookDetails = ({ book }) => {
  return (
    <Card>
      <CardHeader title={book.title} />
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
                  <TblCell>{book.cathegory}</TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.language}</TblCell>
                  <TblCell>{book.language}</TblCell>
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
                      {'Click here'}
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
                  <TblCell>{book.status}</TblCell>
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
