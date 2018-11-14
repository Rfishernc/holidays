import firebase from 'firebase/app';
import navBar from './comp/navbar/navbar';
import auth from './comp/auth/auth';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';
import authHelpers from './helpers/authHelpers';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.createNavBar();
  authHelpers.checkLogInStatus();
  auth.logInButton();
};

init();
