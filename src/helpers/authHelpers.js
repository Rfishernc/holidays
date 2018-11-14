import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLogInStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#friends').hide();
      $('#holidays').show();
      $('#auth').hide();
      $('#navBar-button-auth').hide();
      $('#navBar-button-friends').show();
      $('#navBar-button-holidays').show();
      $('#navBar-button-logout').show();
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

export default { checkLogInStatus };
