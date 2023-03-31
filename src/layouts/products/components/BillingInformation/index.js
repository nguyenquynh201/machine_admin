/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-rename */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/products/components/Bill";
import PropTypes from "prop-types";
import { useEffect } from "react";

function BillingInformation({ products }) {
  useEffect(() => {
    console.log("nè nè sp", products);
  }, [])
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          List sản phẩm
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {products.map((product, i) => <Bill key={i}
            product={product}
          />)}
        </MDBox>
      </MDBox>
    </Card>
  );
}
// Setting default props for the Header
BillingInformation.defaultProps = {
  products: [],
};

// Typechecking props for the Header

export default BillingInformation;
