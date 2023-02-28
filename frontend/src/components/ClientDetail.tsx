import { Link as RouterLink, useParams } from "react-router-dom";
import { CircularProgress, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
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

interface IClientDetailData {
  client: IClientDetail
}

interface IClientDetailVars {
  id: string;
}

type ClientDetailRouteParam = {
  id: string;
}

const tableStyle: SxProps<Theme> = {
  minWidth: 650
};

const labelStyle: SxProps<Theme> = {
  fontWeight: 'bold'
};

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
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

function ClientDetail() {
  const { id } = useParams<ClientDetailRouteParam>();
  const { loading, error, data } = useQuery<IClientDetailData, IClientDetailVars>(GET_CLIENT, { variables: { id: id! }});
  
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
            <Table sx={tableStyle}>
              <TableBody>
                <TableRow>
                  <TableCell sx={labelStyle}>ID</TableCell>
                  <TableCell>{data.client.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Name</TableCell>
                  <TableCell>{data.client.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Age</TableCell>
                  <TableCell>{data.client.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Gender</TableCell>
                  <TableCell>{data.client.additionalInfo.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Company</TableCell>
                  <TableCell>{data.client.additionalInfo.company}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Email</TableCell>
                  <TableCell>{data.client.additionalInfo.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Phone</TableCell>
                  <TableCell>{data.client.additionalInfo.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={labelStyle}>Address</TableCell>
                  <TableCell>{data.client.additionalInfo.address}</TableCell>
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
