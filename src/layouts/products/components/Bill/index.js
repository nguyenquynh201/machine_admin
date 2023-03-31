/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prefer-template */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import defaultImage from "assets/images/ivana-square.jpg";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useEffect, useState } from "react";
import Moment from 'react-moment';
import { BASE_URL } from "config";
import parse from 'html-react-parser';
import CardMedia from "@mui/material/CardMedia";
import { Link, Routes, useNavigate } from "react-router-dom";



function Bill({ product }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  useEffect(() => {
    if ((product?.specifications.substring(0, 150)).props !== undefined) {

      console.log(parse(product?.specifications.substring(0, 150)).props.children);
    }
  }, [])
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      // mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="row" justifyContent="center"
        alignItems="center" onClick={(e) => { navigate("/products/detail-product", { state: product }); }}>
        <MDBox mr={2} width={150}>
          {
            product.imageMachine.length === 0 ? <CardMedia
              src={defaultImage}
              component="img"
              crossOrigin="anonymous"
              display="flex"
              sx={{
                maxWidth: "100%",
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
              }}
            /> : <CardMedia
              src={BASE_URL + "/" + product.imageMachine[0].url}
              component="img"
              crossOrigin="anonymous"
              display="flex"
              sx={{
                maxWidth: "100%",
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          }
        </MDBox>
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {product?.nameMaintenance}
            </MDTypography>

            <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <MDBox mr={1}>
                <MDButton variant="text" color="error">
                  <Icon>delete</Icon>&nbsp;xoá
                </MDButton>
              </MDBox>
              <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                <Icon>edit</Icon>&nbsp;sửa
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Số serial:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {product?.serialNumber}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Năm sản xuất:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                <Moment format="DD/MM/YYYY">{product?.yearOfManufacturer}</Moment>
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDTypography variant="caption" color="text">
            Thông số kỹ thuật:&nbsp;&nbsp;&nbsp;

          </MDTypography>
          <MDBox mt={0.1}>
            <MDTypography mt={0.1} variant="caption" fontWeight="medium" overflow="hidden">
              {product?.specifications.length >= 150 ? parse(product?.specifications.substring(0, 150)) + "..." : parse(product?.specifications)}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox >
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  product: {},
};

// Typechecking props for the Bill
Bill.propTypes = {
  product: PropTypes.object,
};

export default Bill;
