import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/holidayFriends.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((result) => {
      const holidayFriendsObject = result.data;
      const holidayIds = [];
      if (holidayFriendsObject != null) {
        Object.keys(holidayFriendsObject).forEach((hfId) => {
          holidayIds.push(holidayFriendsObject[hfId].holidayId);
        });
      }
      resolve(holidayIds);
    })
    .catch((err) => {
      reject(err);
    });
});


export default {
  getHolidayIdsForFriend,
};
