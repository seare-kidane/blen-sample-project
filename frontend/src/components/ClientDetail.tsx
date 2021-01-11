import React from 'react';
import { Link as RouterLink, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { useQuery, gql } from "@apollo/client";
import { IClient } from './Clients';

interface IClientDetail extends IClient {
  additionalInfo: {
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
  }
}

interface IQueryData {
  fullInfo: IClientDetail
}

interface IClientDetailParam {
  id: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  label: {
    fontWeight: 'bold'
  }
});

function ClientDetail() {
  const classes = useStyles();
  const { id } = useParams<IClientDetailParam>();
  const Client_List = gql`
  query {
    fullInfo(id: "${id}") {
      id,
      name,
      age,
      additionalInfo {
        gender
        company
        email
        phone
        address
      }
    }
  }`;
  const { loading, error, data } = useQuery<IQueryData>(Client_List);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Client Detail</Typography>
        <Link component={RouterLink} to="/">
          Back to List
        </Link>
      </Grid>
      <Grid item xs={12}>
        {loading && (
          <CircularProgress />
        )}
        {!loading && error && (
          `Error! ${error.message}`
        )}
        {!loading && !error && data && (
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.label}>ID</TableCell>
                  <TableCell>{data.fullInfo.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Name</TableCell>
                  <TableCell>{data.fullInfo.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Age</TableCell>
                  <TableCell>{data.fullInfo.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Gender</TableCell>
                  <TableCell>{data.fullInfo.additionalInfo.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Company</TableCell>
                  <TableCell>{data.fullInfo.additionalInfo.company}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Email</TableCell>
                  <TableCell>{data.fullInfo.additionalInfo.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Phone</TableCell>
                  <TableCell>{data.fullInfo.additionalInfo.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.label}>Address</TableCell>
                  <TableCell>{data.fullInfo.additionalInfo.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}

export default ClientDetail;