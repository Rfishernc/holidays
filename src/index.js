import firebase from 'firebase/app';
import navBar from './comp/navbar/navbar';
import auth from './comp/auth/auth';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';
import authHelpers from './helpers/authHelpers';
import friendsPage from './comp/friendsPage/friendsPage';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.createNavBar();
  authHelpers.checkLogInStatus(friendsPage.initFriendsPage);
  auth.logInButton();
};

init();
