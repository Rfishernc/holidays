import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const getHolidaysByArrayOfIds = (uid, holidayIds) => new Promise((resolve, reject) => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const holidaysObject = result.data;
      const holidaysArray = [];
      if (holidaysObject != null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          holidaysObject[holidayId].id = holidayId;
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      const selectedHolidays = holidaysArray.filter(x => holidayIds.includes(x.id));
      resolve(selectedHolidays);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getHolidaysByArrayOfIds,
};
