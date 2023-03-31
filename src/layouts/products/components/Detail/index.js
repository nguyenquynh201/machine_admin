/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";


import { useEffect, useState, CSSProperties } from "react";
import { useLocation } from 'react-router-dom';
// Data
import authorsTableData from "layouts/customers/data/authorsTableData";
import projectsTableData from "layouts/customers/data/projectsTableData";
import productAPI from "data/api/products/productAPI";
import Moment from 'react-moment';
import parse from 'html-react-parser';
import { BASE_URL } from "config";
import CardMedia from "@mui/material/CardMedia";
import ClipLoader from "react-spinners/ClipLoader";


function DetailProduct() {

    const location = useLocation();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setProduct(location.state);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        console.log("product ", product);
        // getProductById(location.state._id);
    }, [product]);

    return (
        <DashboardLayout>
            <DashboardNavbar isMini />
            <MDBox mt={8} >
                {!loading
                    ?
                    <MDBox mt={8} mb={10}>
                        <Card  >
                            <MDBox
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="success"
                                mx={2}
                                mt={-3}
                                p={3}
                                mb={1}
                                textAlign="center"
                            >
                                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                    Chi tiết sản phẩm
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={10} px={3} mx={30} >
                                <MDBox component="form" role="form" >
                                    <MDBox mb={5} >
                                        <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                            Tên sản phẩm
                                        </MDTypography>
                                        <MDTypography fontWeight="regular">
                                            {product?.nameMaintenance}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mb={5}>
                                        <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                            Số serial
                                        </MDTypography>
                                        <MDTypography fontWeight="regular">
                                            {product?.serialNumber}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mb={5} >
                                        <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                            Nhà sản xuất
                                        </MDTypography>
                                        <MDTypography fontWeight="regular">
                                            {product?.manufacturer}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mb={5} >
                                        <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                            Thông số kỹ thuật
                                        </MDTypography>
                                        <MDTypography fontWeight="regular">
                                            {product !== undefined ? parse(product?.specifications) : product?.specifications}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mb={5} >
                                        <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                            Năm sản xuất
                                        </MDTypography>
                                        <Moment format="DD/MM/YYYY">{product?.yearOfManufacturer}</Moment>
                                    </MDBox>
                                    {
                                        product?.imageMachine.length === 0 ? <MDBox></MDBox> :
                                            <MDBox mb={5} >
                                                <MDTypography variant="h4" fontWeight="medium" mb={1}>
                                                    Hình ảnh
                                                </MDTypography>
                                                {product?.imageMachine.map((item, index) => <CardMedia
                                                    src={BASE_URL + "/" + item.url}
                                                    component="img"
                                                    crossOrigin="anonymous"
                                                    display="flex"
                                                    key={index}
                                                    height={300}
                                                    sx={{
                                                        maxWidth: "80%",
                                                        margin: 0,
                                                        boxShadow: ({ boxShadows: { md } }) => md,
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                />)}
                                            </MDBox>
                                    }

                                </MDBox>
                            </MDBox>
                        </Card>
                    </MDBox>
                    :
                    <MDBox
                        mx={2}
                        p={3}
                        mb={100}
                        mt={8}
                        textAlign="center">
                        <ClipLoader
                            color={'red'}
                            loading={loading}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </MDBox>
                }
            </MDBox>


            <Footer />
        </DashboardLayout>
    );
}

export default DetailProduct;
