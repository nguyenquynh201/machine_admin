/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { BASE_URL } from "config";

export default {
    LOGIN_PATH: BASE_URL + "/auth/login",
    REFRESH_TOKEN_PATH: BASE_URL + "/auth/refresh_token",
    USER_ME: BASE_URL + "/users/me",
    PRODUCT: BASE_URL + "/products",
};
