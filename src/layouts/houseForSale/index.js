/* eslint-disable no-else-return */
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

import { Routes, Route, Navigate } from "react-router-dom";

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
import { HousesForSalesContext } from "context/house";

// Data
import { useContext } from "react";

import { Skeleton } from "@mui/material";
import housesTableData from "./data/housesTableData";

function HousesForSales() {
  const { columns, rows } = housesTableData();
  const userToken = localStorage.getItem("mosali");
  const [, isLoading] = useContext(HousesForSalesContext);

  if (userToken) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Maisons en vente
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {isLoading ? (
                    <Grid minHeight={350}>
                      <Skeleton
                        style={{ borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}
                        sx={{ bgcolor: "grey.800" }}
                        animation="pulse"
                        height={350}
                        variant="rounded"
                      />
                    </Grid>
                  ) : (
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    );
  }
}

export default HousesForSales;
