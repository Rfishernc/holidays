import './auth.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from '../../../google.png';

const logInButton = () => {
  const tempString = `
    <button id='google-auth' class='btn btn-secondary'>
      <img src='${googleImage}'/>
    </button>`;
  $('#auth').html(tempString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default { logInButton };
