/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import useToken from 'data/useToken';
import constant from 'constants/constant';

async function getProfile(param) {
    const data = await axios.get(constant.USER_ME, {
        headers: { "Authorization": "Bearer " + param }
    })
        .then(response => {
            console.log(response);
            return response;

        })
        .catch(error => console.log(error));
    return data;
}
async function loginUser(credentials) {
    console.log(credentials);
    const data = await axios.post(constant.LOGIN_PATH, credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data.accessToken);
            // console.log(token);
            return response;

        })
        .catch(error => console.log(error));
    return data;
}
export default { getProfile, loginUser }  