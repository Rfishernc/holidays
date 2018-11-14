import './navbar.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const navBarEvents = () => {
  $('.nav-link').on('click', (event) => {
    if (event.target.id === 'navBar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#friends').hide();
        $('#holidays').hide();
      }).catch((err) => {
        console.log(err);
      });
    }
    if (event.target.id === 'navBar-button-holidays') {
      $('#auth').hide();
      $('#friends').hide();
      $('#holidays').show();
    }
    if (event.target.id === 'navBar-button-friends') {
      $('#auth').hide();
      $('#friends').show();
      $('#holidays').hide();
    }
    if (event.target.id === 'navBar-button-auth') {
      $('#auth').show();
      $('#friends').hide();
      $('#holidays').hide();
    }
  });
};

const createNavBar = () => {
  const tempString = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                              <a id='navBar-button-auth' class="nav-link">Authentication</a>
                            </li>
                            <li class="nav-item">
                              <a id='navBar-button-holidays' class="nav-link">Holidays</a>
                            </li>
                            <li class="nav-item">
                              <a id='navBar-button-friends' class="nav-link">Friends</a>
                            </li>
                            <li class="nav-item">
                              <a id='navBar-button-logout' class="nav-link">Logout</a>
                            </li>
                          </ul>
                        </div>
                      </nav>`;
  $('#navBar').html(tempString);
  navBarEvents();
};

export default { createNavBar };
