import * as React from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './App.css';

import { initializeApp } from './services/firebase';
import { FirestoreService } from './services/firestore';
import { initStore } from './services/auth';
import { BrowserRouter, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import SprintPage from './pages/sprint';
import { SprintService } from './services/sprint';
import { TodoService } from './services/todo';
import { WelcomePage } from './pages/welcome';
import { AuthProvider } from './context/auth';
import { Route } from './components/Route';

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
          <AuthProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <WelcomePage />} />
                <Route exact path="/login" render={() => <LoginPage />} />
                <Route
                  exact
                  path="/sprint"
                  requireAuth={true}
                  render={() => <SprintPage />}
                />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
        </MobxProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
