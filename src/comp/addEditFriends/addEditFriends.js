import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../data/friendsData';
import friendspage from '../friendsPage/friendsPage';

const formBuilder = (friend) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith" value='${friend.name}'>
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address</label>
    <input type="text" class="form-control" id="form-friend-address" placeholder="111 Boring Rd." value='${friend.address}'>
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email</label>
    <input type="text" class="form-control" id="form-friend-email" placeholder="bigjerk@google.com" value='${friend.email}'>
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number</label>
    <input type="text" class="form-control" id="form-friend-phone" placeholder="555-555-5556" value='${friend.phoneNumber}'>
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship</label>
    <input type="text" class="form-control" id="form-friend-relationship" placeholder="Nemesis" value='${friend.relationship}'>
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
  const emptyFriend = {
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    relationship: '',
  };
  let domString = `
  <h2>Add New Friends</h2>`;
  domString += formBuilder(emptyFriend);
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

const buildEditForm = (event) => {
  const idToEdit = event.target.dataset.editId;
  friendsData.getSingleFriend(idToEdit)
    .then((singleFriend) => {
      let domString = `
      <h2>Edit Friend</h2>`;
      domString += formBuilder(singleFriend);
      domString += `
      <button id='edit-friend' data-single-edit-id=${singleFriend.id}>Save Friend</button>`;
      $('#add-edit-friend').html(domString).show();
      $('#friends').hide();
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateFriend = (event) => {
  const updatedFriend = getFriendFromForm();
  const friendId = event.target.dataset.singleEditId;
  friendsData.updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#single-container').html('');
      $('#friends').show();
      friendspage.initFriendsPage();
    })
    .catch((err) => {
      console.log(err);
    });
};

$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', buildEditForm);
$('body').on('click', '#edit-friend', updateFriend);

export default {
  formBuilder,
  getFriendFromForm,
  buildAddForm,
  addNewFriend,
  buildEditForm,
  updateFriend,
};
