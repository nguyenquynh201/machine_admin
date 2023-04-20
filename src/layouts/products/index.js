/* eslint-disable no-nested-ternary */
/* eslint-disable no-empty */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
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
import productAPI from "data/api/products/productAPI";
import { useMaterialUIController, setLoading, setHideLoading } from "context";
import { Link } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);
  const [isLoadMore, setLoadMore] = useState(false);
  const [hasReachEnd, setHasReachEnd] = useState(false);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [controller, dispatch] = useMaterialUIController();
  const {
    token,
  } = controller;
  useEffect(async () => {
    console.log("token", token);
    setLoading(dispatch, true);
    try {
      await productAPI.getProduct({ "offset": offset === undefined ? 0 : offset, "limit": 15 }).then((data) => {
        console.log("data", data);
        setTotal(data.data.total);
        setOffset(data.data.length);
        setProducts(data.data.data);
        setHideLoading(dispatch, false);
      });
    } catch (error) {
      setHideLoading(dispatch, false);

    }


  }, []);
  async function loadMoreProduct() {
    setLoadMore(true);
    const productList = [...products];
    console.log("nè nè ", productList);
    try {
      await productAPI.getProduct({ "offset": products.length, "limit": 15 }).then((value) => {
        productList.push(...value.data.data)
        console.log("nè nè nè ", productList);
        setProducts(productList);

        setTotal(value.data.total);
        if (value.data.total >= products.length) {
          setHasReachEnd(true);
        }
        setLoadMore(false);
      });
    } catch (error) {
      setLoadMore(false);
    }

  }
  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Quản lý sản phẩm
            </MDTypography>
            <MDButton variant="gradient" color="dark" component={Link}
              to="/products/create-product">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Thêm mới sản phẩm
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={3}>
          <BillingInformation products={products} />
          {total > products.length ? <MDBox mb={1} mt={1} alignContent="center" justifyContent="center" display="flex">
            <MDButton variant="gradient" color="dark"
              onClick={() => loadMoreProduct()}>
              &nbsp;Hiển thị thêm
            </MDButton>
          </MDBox> : <MDBox></MDBox>}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
