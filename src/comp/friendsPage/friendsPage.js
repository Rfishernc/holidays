import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../data/friendsData';

const printSingleFriend = (friend) => {
  const friendString = `
    <div>
      <h1>${friend.name}</h1>
      <h3>${friend.relationship}</h3>
      <p>${friend.address}</p>
      <p>${friend.email}</p>
      <p>${friend.phoneNumber}</p>
      <button class='btn btn-danger delete-btn' data-delete-id=${friend.id}>X</button>
    </div>`;
  $('#single-container').html(friendString);
};

const getSingleFriend = (event) => {
  const friendId = event.target.dataset.dropdownId;
  friendsData.getSingleFriend(friendId)
    .then((singleFriend) => {
      printSingleFriend(singleFriend);
    })
    .catch((err) => {
      console.log(err);
    });
};

const buildDropDown = (friendsArray) => {
  let dropDown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropDown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropDown += `
    <div class="dropdown-item">You have no friends.</div>`;
  }
  dropDown += `</div>
    </div>`;
  $('#dropdown-container').html(dropDown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
      buildDropDown(friendsArray);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFriend = (event) => {
  const idToDelete = event.target.dataset.deleteId;
  friendsData.deleteFriend(idToDelete)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((err) => {
      console.log(err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default {
  friendsPage,
  buildDropDown,
  getSingleFriend,
  bindEvents,
  initFriendsPage,
  printSingleFriend,
  deleteFriend,
};
