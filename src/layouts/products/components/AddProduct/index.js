/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable object-shorthand */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
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

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import UnstyledInputBasic from "components/MDInputArea";
import { useAlert } from 'react-alert'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useRef, useMemo } from "react";
import Icon from "@mui/material/Icon";
import JoditEditor from 'jodit-react';
import productAPI from "data/api/products/productAPI";
// Authentication layout components
import { Link, Routes, useNavigate } from "react-router-dom";
import { useMaterialUIController, setLoading, setHideLoading } from "context";

// Images

function AddProduct() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        loading
    } = controller;
    const [selectedImage, setSelectedImage] = useState([]);
    const [image, setImage] = useState();

    const editor = useRef(null);
    const [nameMaintenance, setNameProduct] = useState("");
    const [serialNumber, setSerialNumber] = useState(0);
    const [manufacturer, setManufacturer] = useState("");
    const [specifications, setSpecifications] = useState("");
    const [yearOfManufacturer, setYearOfManufacturer] = useState("");
    const alert = useAlert()
    const navigate = useNavigate();

    const handlePreviewImage = (e) => {
        const file = e.target.files;
        setImage(file[0])
        const arrayFile = Array.from(file);
        const imageArray = arrayFile.map((img) => {
            return URL.createObjectURL(img);
        });
        setSelectedImage((previewImage) => previewImage.concat(imageArray));

    }
    const createProduct = async () => {
        if (nameMaintenance === "" || serialNumber.length < 10 || serialNumber.length > 10 || manufacturer === "" || specifications === "" || yearOfManufacturer === "") {
            alert.show('Vui lòng không để trống các trường bắt buộc!!!');
        } else {
            try {
                setLoading(dispatch, true);
                const data = await productAPI.createProduct(JSON.stringify({ "nameMaintenance": nameMaintenance.toString(), "serialNumber": serialNumber.toString(), "manufacturer": manufacturer.toString(), "specifications": specifications.toString(), "yearOfManufacturer": yearOfManufacturer.toString() }));
                console.log("data", data.data);
                if (data != null) {
                    if (image != null) {
                        await productAPI.uploadImage({ "image": image, "productId": data.data._id });
                    }
                    setHideLoading(dispatch, false);
                    alert.show('Tạo sản phẩm thành công!!!');
                    navigate('/products');
                }
            } catch (error) {
                setHideLoading(dispatch, false);
                alert.show('Tạo sản phẩm không thành công!!!');
            }

        }

    }
    return (
        <DashboardLayout>
            <DashboardNavbar isMini />
            <MDBox mt={8}>
                <Card >
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
                            Thêm sản phẩm
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={10} px={3} mx={30} >
                        <MDBox component="form" role="form" >
                            <MDBox mb={5} >
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Tên sản phẩm
                                </MDTypography>
                                <MDInput type="text" placeholder="Sản phẩm abc..." onChange={(event) => {
                                    setNameProduct(event.target.value);
                                    console.log(event.target.value);
                                }} fullWidth />
                            </MDBox>
                            <MDBox mb={5}>
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Số serial
                                </MDTypography>
                                <MDInput type="number" hiddenLabel placeholder="123xxx1234" onChange={(event) => {
                                    setSerialNumber(event.target.value);
                                    console.log(event.target.value);
                                    console.log(serialNumber.length);
                                }} fullWidth />
                                {serialNumber.length > 10 || serialNumber.length < 10 ? <MDTypography variant="caption" color="error" fontWeight="medium" mb={1}>
                                    Số serial gồm 10 số
                                </MDTypography> : <MDBox></MDBox>}
                            </MDBox>
                            <MDBox mb={5} >
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Nhà sản xuất
                                </MDTypography>
                                <MDInput type="text" placeholder="Việt nam..." onChange={(event) => {
                                    setManufacturer(event.target.value);
                                    console.log(event.target.value);
                                }} fullWidth />

                            </MDBox>
                            <MDBox mb={5} >
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Thông số kỹ thuật
                                </MDTypography>
                                <JoditEditor
                                    ref={editor}
                                    value={specifications}
                                    // config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={(newContent) => {
                                        setSpecifications(newContent);
                                        // console.log(event.target.value);

                                    }} // preferred to use only this option to update the content for performance reasons

                                />
                            </MDBox>
                            <MDBox mb={5} >
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Năm sản xuất
                                </MDTypography>

                                <MDInput type="date" onChange={(event) => {
                                    setYearOfManufacturer(new Date(event.target.value).toISOString());
                                    console.log(new Date(event.target.value).toISOString());
                                }} fullWidth />
                            </MDBox>
                            <MDBox mb={5} >
                                <MDTypography variant="h6" fontWeight="medium" mb={1}>
                                    Hình ảnh
                                </MDTypography>
                                <MDInput type="file" fullWidth onChange={handlePreviewImage} name="images" multiple accept="image/png , image/jpeg , image/webp" />
                            </MDBox>
                            <MDBox mb={5} >
                                {selectedImage && selectedImage.map((item, index) => {
                                    return <MDBox key={index} display="inline-flex" >
                                        <img height={100} src={item} alt="something here" ml={5} shadow="md" />
                                        <Icon fontSize="small" position="absolute" z-index={2} onClick={() => setSelectedImage(selectedImage.filter((img) => img !== item))} >clear</Icon>
                                    </MDBox>
                                })}
                            </MDBox>
                            <MDBox mx={20} mb={2} mt={10} justifyContent="center" alignItems="center" >
                                <MDButton variant="gradient" color="info" fullWidth onClick={createProduct}>
                                    Thêm
                                </MDButton>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Card>
            </MDBox>

            <Footer />
        </DashboardLayout>

    );
}

export default AddProduct;
