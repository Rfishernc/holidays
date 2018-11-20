import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLogInStatus = (initFriendsPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#friends').hide();
      $('#holidays').show();
      $('#auth').hide();
      $('#navBar-button-auth').hide();
      $('#navBar-button-friends').show();
      $('#navBar-button-holidays').show();
      $('#navBar-button-logout').show();
      initFriendsPage();
    } else {
      $('#friends').hide();
      $('#holidays').hide();
      $('#auth').show();
      $('#navBar-button-auth').show();
      $('#navBar-button-friends').hide();
      $('#navBar-button-holidays').hide();
      $('#navBar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLogInStatus, getCurrentUid };
