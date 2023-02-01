/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import { useContext } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import CircularProgress from "@mui/material/CircularProgress";

import { HousesForRenContext } from "context/house";

import { Avatar } from "@mui/material";

export default function data() {
  const [houses, ,] = useContext(HousesForRenContext);
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]?.toUpperCase()}`,
    };
  }

  const Author = ({ username = "GM", email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <Avatar {...stringAvatar(username)} />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {username || ""}
        </MDTypography>
        <MDTypography variant="caption">{email || ""}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Adress = ({ town, discrict }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {town}
      </MDTypography>
      <MDTypography variant="caption">{discrict}</MDTypography>
    </MDBox>
  );
  return {
    columns: [
      { Header: "Auteur", accessor: "author", width: "45%", align: "left" },
      { Header: "Commune", accessor: "adress", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Prix", accessor: "price", align: "center" },
      { Header: "Unité", accessor: "unity", align: "center" },
    ],

    rows: houses.map((house) => ({
      author: <Author username={house?.recorded_by?.userName} email={house?.recorded_by?.email} />,
      adress: <Adress town={house?.town} discrict={house?.district?.district} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={house?.status} color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {house?.price?.price}
        </MDTypography>
      ),
      unity: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {house?.price?.currency}
        </MDTypography>
      ),
    })),
  };
}
