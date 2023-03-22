/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
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
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
// import PaymentMethod from "layouts/products/components/PaymentMethod";
// import Invoices from "layouts/products/components/Invoices";
import BillingInformation from "layouts/products/components/BillingInformation";
// import Transactions from "layouts/products/components/Transactions";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(async () => {

    await axios.get('http://localhost:3000/products', {
      headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDc2M2RiOGQ3OWU2MTExYzUyNzYxMSIsInVzZXIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6ImNvbnRhaW5lciIsImlhdCI6MTY3OTQ4NTA2NywiZXhwIjoxNjc5NDkyMjY3fQ.MzJKs16XxBODr849_LKJolCBvK07eQmEYrUosOMrbP4'// token ở đây là access token của bạn
      }
    })
      .then(response => {
        setProducts(response.data);
        console.log(products);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Quản lý sản phẩm
            </MDTypography>
            <MDButton variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Thêm mới sản phẩm
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={3}>
          <BillingInformation />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
