import * as React from 'react';

import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { WithRouter } from '../components/WithRouter';
import { AuthContext } from 'src/context/auth';

const Spinner1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Spinner2 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;

  -webkit-animation-delay: -1s;
  animation-delay: -1s;

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const SpinnerRoot = styled.div`
  width: 60px;
  height: 60px;

  position: relative;
  margin: auto;
  top: 50%;
`;

const Spinner = () => (
  <SpinnerRoot>
    <Spinner1 />
    <Spinner2 />
  </SpinnerRoot>
);

const LoadingScreen = () => (
  <div style={{ background: '#3f51b5', height: '100%', width: '100%' }}>
    <Spinner />
    <Typography
      style={{ margin: 'auto', width: 'fit-content' }}
      variant="display1"
      color="textSecondary"
    >
      Retro
    </Typography>
  </div>
);

const WelcomePage = () => {
  const { isLoading, user } = React.useContext(AuthContext);

  return (
    <WithRouter>
      {({ router }) => {
        if (!isLoading && !user) {
          router.history.replace('/login');
        } else if (!isLoading && user) {
          router.history.replace({
            pathname: '/sprint',
            search: `?id=${user.currentSprintId}`
          });
        }

        return <LoadingScreen />;
      }}
    </WithRouter>
  );
};

export { WelcomePage };
