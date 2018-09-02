import React from 'react';
import { Context } from 'next/document';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { App } from '../components/App';
import { initializePage } from '../utils/initialisePage';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

interface PageProps extends Context {
  isServer: boolean;
}

class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Index Page</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default initializePage(Index);
