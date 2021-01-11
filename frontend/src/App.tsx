import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { ApolloProvider, ApolloClient, InMemoryCache  } from '@apollo/client';
import Clients from "./components/Clients";
import ClientDetail from "./components/ClientDetail";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {  
  return (
    <Router>
      <CssBaseline />
      <Grid container direction="column" justify="flex-start" alignItems="center" style={{ height: '100vh' }}>
        <Grid item>
          <Typography variant="h3">
            Blen Sample Project
          </Typography>
        </Grid>
        <Grid item>
          <Container maxWidth="md">
            <ApolloProvider client={client}>
              <Switch>
                <Route exact path="/">
                  <Clients />
                </Route>
                <Route exact path="/:id">
                  <ClientDetail />
                </Route>
              </Switch>
            </ApolloProvider>
          </Container>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
