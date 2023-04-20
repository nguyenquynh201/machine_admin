/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import moment from 'moment';

function convertDateTime(date) {
    let dateConvert = moment(date).format('yyyy-MM-DD');
    return dateConvert;

}
export default { convertDateTime }
