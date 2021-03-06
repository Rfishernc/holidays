import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../data/friendsData';
import holidayFriendsdata from '../../data/holidayFriendsData';
import holidaysData from '../../data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = `
  <h3>Holidays: </h3>`;
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};

const printSingleFriend = (friend, holidays) => {
  const friendString = `
    <div>
      <h1>${friend.name}</h1>
      <h3>${friend.relationship}</h3>
      <p>${friend.address}</p>
      <p>${friend.email}</p>
      <p>${friend.phoneNumber}</p>
      <div class="form-check form-check-inline">
        <label class="form-check-label" for="inlineCheckbox1">Am I avoiding them? </label>
        <input class="form-check-input is-avoiding-checkbox" type="checkbox" id="${friend.id}">     
      </div>
      <button class='btn btn-danger delete-btn' data-delete-id=${friend.id}>X</button>
      <button class='btn btn-info edit-btn' data-edit-id=${friend.id}>Edit</button>
      <div class='holiday-container'>${holidayStringBuilder(holidays)}</div>
    </div>`;
  $('#single-container').html(friendString);
  if (friend.isAvoiding) {
    $('.is-avoiding-checkbox').attr('checked', true);
  }
};

const getSingleFriend = (event) => {
  const friendId = event.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData.getSingleFriend(friendId)
    .then((singleFriend) => {
      holidayFriendsdata.getHolidayIdsForFriend(friendId).then((holidayIds) => {
        holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
          printSingleFriend(singleFriend, holidays);
        });
      });
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

const updateIsAvoiding = (event) => {
  const friendId = event.target.id;
  const isAvoiding = event.target.checked;
  friendsData.updatedIsAvoiding(friendId, isAvoiding)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
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
