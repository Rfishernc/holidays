// import $ from 'jquery';
import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const getAllFriends = uid => new Promise((resolve, reject) => {
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


const getSingleFriend = friendId => new Promise((resolve, reject) => {
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

const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`, { isAvoiding });

const deleteFriend = friendId => axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`);

const addNewFriend = friendObject => axios.post(`${apiKeys.firebaseKeys.databaseURL}/friends.json`, JSON.stringify(friendObject));

const updateFriend = (friendObject, friendId) => axios.put(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`, JSON.stringify(friendObject));

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
  addNewFriend,
  updateFriend,
  updatedIsAvoiding,
};
