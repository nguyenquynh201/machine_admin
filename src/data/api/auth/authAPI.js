/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { localStorageHelper } from "data/useToken";
import constant from 'constants/constant';

async function refreshAccessToken(param) {
    const data = await axios.post(constant.REFRESH_TOKEN_PATH, param, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (param.accessToken != response.data.accessToken) {
                localStorageHelper.store('token', response.data);
                console.log(response.data.accessToken);
            }
            console.log(param.accessToken);

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
        .catch(error => {
            return error;
        });
    return data;
}
export default { refreshAccessToken, loginUser }  