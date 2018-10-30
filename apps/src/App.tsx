import * as React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './App.css';

import { initializeApp } from './services/firebase';
import { FirestoreService } from './services/firestore';
import { initStore } from './services/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import IndexPage from './pages';
import SprintPage from './pages/sprint';
import { SprintService } from './services/sprint';
import { TodoService } from './services/todo';

initializeApp();
const authService = initStore();
const firestoreService = new FirestoreService('FirestoreService');
const sprintService = new SprintService(firestoreService, authService);
const todoService = new TodoService();

const theme = createMuiTheme({});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MobxProvider
          AutoObservableFactory={firestoreService}
          FirestoreService={firestoreService}
          AuthService={authService}
          SprintService={sprintService}
          TodoService={todoService}
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
