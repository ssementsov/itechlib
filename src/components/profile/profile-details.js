import React from 'react';
import { types } from '../../types';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { titles } from './../../common/constants/profile-titles-constants';

const TblCell = styled(TableCell)(() => ({
    textAlign: 'left',
    cursor: 'auto',
    borderBottom: '1px solid #E7E8EF',
    borderTop: '1px solid #E7E8EF',
    padding: '5px 35px',
}));

const ProfileDetails = (props) => {
    const { user } = props;

    return (
        <Card>
            <CardHeader title={titles.title} />
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
                                    <TblCell>{titles.name}</TblCell>
                                    <TblCell>{user.name}</TblCell>
                                </TableRow>
                                <TableRow>
                                    <TblCell>{titles.surname}</TblCell>
                                    <TblCell>{user.surname}</TblCell>
                                </TableRow>
                                <TableRow>
                                    <TblCell>{titles.corpEmail}</TblCell>
                                    <TblCell>{user.corpEmail}</TblCell>
                                </TableRow>
                                <TableRow>
                                    <TblCell>{titles.googleEmail}</TblCell>
                                    <TblCell>{user.googleEmail}</TblCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ProfileDetails.propTypes = {
    user: types.userTypes,
};

export default ProfileDetails;
