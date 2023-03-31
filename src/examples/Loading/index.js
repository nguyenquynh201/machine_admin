/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react'
import MDBox from 'components/MDBox';
import ClipLoader from "react-spinners/ClipLoader";
import { useMaterialUIController } from "context";


function Loading() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        loading
    } = controller;
    if (!loading) return null;
    return (
        <MDBox
            mx={2}
            p={3}
            mb={100}
            mt={8}
            textAlign="center">
            <ClipLoader
                color={'red'}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </MDBox>
    );
};
export default Loading;