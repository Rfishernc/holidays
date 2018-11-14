import './navbar.scss';
import $ from 'jquery';

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
};

export default { createNavBar };