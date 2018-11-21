// import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const getAllFriends = (uid) => {
  return new Promise((resolve, reject) => {
    axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`)
      .then((results) => {
        const friendsObject = results.data;
        const friendsArray = [];
        if (friendsObject !== null) {
          Object.keys(friendsObject).forEach((friendId) => {
            friendsObject[friendId].id = friendId;
            friendsArray.push(friendsObject[friendId]);
          });
        }
        resolve(friendsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSingleFriend = (friendId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
      .then((result) => {
        const singleFriend = result.data;
        singleFriend.id = friendId;
        resolve(singleFriend);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteFriend = (friendId) => {
  console.log(friendId);
};

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
};
