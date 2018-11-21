import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../data/friendsData';
import friendspage from '../friendsPage/friendsPage';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address</label>
    <input type="text" class="form-control" id="form-friend-address" placeholder="111 Boring Rd.">
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email</label>
    <input type="text" class="form-control" id="form-friend-email" placeholder="bigjerk@google.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number</label>
    <input type="text" class="form-control" id="form-friend-phone" placeholder="555-555-5556">
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship</label>
    <input type="text" class="form-control" id="form-friend-relationship" placeholder="Nemesis">
  </div>`;
  return form;
};

const getFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const buildAddForm = () => {
  let domString = `
  <h2>Add New Friends</h2>`;
  domString += formBuilder();
  domString += `
  <button id='add-friend'>Add Friends</button>`;
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = getFriendFromForm();
  friendsData.addNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#friends').show();
      friendspage.initFriendsPage();
    })
    .catch((err) => {
      console.log(err);
    });
};

$('body').on('click', '#add-friend', addNewFriend);

export default {
  formBuilder,
  getFriendFromForm,
  buildAddForm,
  addNewFriend,
};
