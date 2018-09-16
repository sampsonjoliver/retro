import * as React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './App.css';
import logo from './logo.svg';

import { initializeApp } from './services/firebase';
import { FirestoreService } from './services/firestore';
import { initStore } from './services/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import IndexPage from './pages';
import SprintPage from './pages/sprint';

initializeApp();
const authService = initStore();
const firestoreService = new FirestoreService('FirestoreService');

const theme = createMuiTheme({});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MobxProvider
          AutoObservableFactory={firestoreService}
          FirestoreService={firestoreService}
          auth={authService}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <IndexPage />} />
              <Route exact path="/login" render={() => <LoginPage />} />
              <Route exact path="/sprint" render={() => <SprintPage />} />
            </Switch>
          </BrowserRouter>
        </MobxProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
