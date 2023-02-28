import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from "./components/Clients";
import ClientDetail from "./components/ClientDetail";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" style={{ height: '100vh' }}>
          <Grid item>
            <Typography variant="h3">
              Blen Sample Project
            </Typography>
          </Grid>
          <Grid item>
            <Container maxWidth="md">
              <ApolloProvider client={client}>
                <Routes>
                  <Route path="/" element={<Clients />} />
                  <Route path="/:id" element={<ClientDetail />} />
                </Routes>
              </ApolloProvider>
            </Container>
          </Grid>
        </Grid>
      </Router>
    </>
  );
}

export default App;
