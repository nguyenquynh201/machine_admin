/* eslint-disable no-empty */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useContext } from "react";

// react-router-dom components
import { Link, Routes, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useAlert } from 'react-alert'
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import authAPI from "data/api/auth/authAPI";
import userAPI from "data/api/users/userAPI";
import { localStorageHelper } from "data/useToken";

import { useMaterialUIController, setUserInfor, setToken, setLoading, setHideLoading } from "context";

function Basic() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    user,
    token,
    loading
  } = controller;
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccessToken] = useState();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const alert = useAlert()

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(setUserInfor);
    // console.log(password); 
    try {
      setLoading(dispatch, loading);
      const data = await authAPI.loginUser(JSON.stringify({ username, password }));
      console.log(data.status);
      if (data.status !== 404) {
        const userData = await userAPI.getProfile(data.data.accessToken);
        setAccessToken(data.data.accessToken);
        setToken(dispatch, data.data);
        setUserInfor(dispatch, userData.data);
        localStorageHelper.store('user-info', userData.data);
        localStorageHelper.store('token', data.data);
        setSuccess(true);
        setHideLoading(dispatch, loading);
        alert.show('Đăng nhập thành công!!!');
        navigate("/dashboard");
      }
    } catch (error) {
      setHideLoading(dispatch, loading);
      alert.show("Đăng nhập không thành công !!!!");
      console.log(error);
    }


  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Username" onChange={(event) => {
                setUserName(event.target.value);
                console.log(event.target.value);
              }} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={(event) => {
                setPassword(event.target.value);
                console.log(event.target.value);
              }} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
