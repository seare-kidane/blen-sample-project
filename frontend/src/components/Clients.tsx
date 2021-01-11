import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@material-ui/core';
import { useQuery, gql } from "@apollo/client";

export interface IClient {
  id: string;
  age: number;
  name: string;
}

interface IClientData {
  clients: IClient[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const GET_CLIENTS = gql`
  query {
    clients {
      id,
      name,
      age
    }
  }
`;

function Clients() {
  const classes = useStyles();
  const { loading, error, data } = useQuery<IClientData>(GET_CLIENTS);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Client List</Typography>
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
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.clients.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Link component={RouterLink} to={`/${row.id}`}>
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}

export default Clients;
