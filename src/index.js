import $ from 'jquery';
import firebase from 'firebase/app';
import navBar from './comp/navbar/navbar';
import auth from './comp/auth/auth';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';
import authHelpers from './helpers/authHelpers';
import friendsPage from './comp/friendsPage/friendsPage';
import addEditFriends from './comp/addEditFriends/addEditFriends';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.createNavBar();
  authHelpers.checkLogInStatus(friendsPage.initFriendsPage);
  auth.logInButton();
  $('#show-friend-form').on('click', addEditFriends.buildAddForm);
};

init();
