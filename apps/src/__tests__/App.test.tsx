import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';

jest.mock('../services/firebase');
jest.mock('../services/firestore');
jest.mock('../services/auth');
jest.mock('../pages/login');
jest.mock('../pages/index');
jest.mock('../pages/sprint');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
