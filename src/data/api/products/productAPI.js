/* eslint-disable no-else-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import constant from 'constants/constant';
import { localStorageHelper } from 'data/useToken';

async function getProduct(param) {
    const url = `${constant.PRODUCT}?limit=${param.limit}&offset=${param.offset}`;
    let token = localStorageHelper.load('token') ?? undefined;
    if (token != undefined) {
        const data = await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token.accessToken
            }
        })
            .then(response => {
                return response;
            })
            .catch(error => console.log(error));
        return data;
    } else {
        return null;
    }


}
async function createProduct(credentials) {
    console.log(credentials);
    let token = localStorageHelper.load('token') ?? undefined;
    if (token != undefined) {
        const data = await axios.post(constant.PRODUCT, credentials, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.accessToken
            }
        })
            .then(response => {
                return response;

            })
            .catch(error => console.log(error));
        return data;
    }
    return null;

}
async function getProductById(param) {
    console.log(param);
    let token = localStorageHelper.load('token') ?? undefined;
    if (token != undefined) {
        const data = await axios.get(constant.PRODUCT + "/" + param, {
            headers: {
                Authorization: 'Bearer ' + token.accessToken
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error));
        return data;
    } else {
        return null;
    }

}
async function uploadImage(param) {
    console.log(param.image);

    let formData = new FormData();
    formData.append('file', param.image);
    let token = localStorageHelper.load('token') ?? undefined;
    if (token != undefined) {
        await axios.post(constant.PRODUCT + "/" + param.productId + "/imageServer", formData, {
            headers: {
                Authorization: 'Bearer ' + token.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                // console.log(response.data.accessToken);
                // console.log(token);
                return response;

            })
            .catch(error => console.log(error));
    }

}
export default { getProduct, createProduct, uploadImage, getProductById }  