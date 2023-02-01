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

import { useState, useRef } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/home-bg7.jpg";
import brand from "assets/images/gm-logement.png";

import { signIn } from "services";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [loading, setLoading] = useState(false);

  const form = useRef();

  const { origin } = window.location;

  const login = () => {
    const user = {
      email: form.current[0].value,
      password: form.current[2].value,
    };
    if (user.email && user.password) {
      setLoading(true);
      signIn(user)
        .then((res) => {
          const dashboardRoute = `${origin}/dashboard`;
          localStorage.setItem("mosali", res.data.token);
          window.location.assign(dashboardRoute);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            // console.log("mot de passe ou mail incorrect");
          }
          // console.log(err.response.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDBox component="img" src={brand} alt="Brand" width="5rem" />
          <Grid>
            <MDTypography variant="p" fontWeight="normal" color="white" mt={1}>
              Connexion
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" ref={form}>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
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
                &nbsp;&nbsp;Se souvenir de moi
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={login} variant="gradient" color="warning" fullWidth>
                Connexion
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Vous n&apos;avez pas de compte?{" "}
                <MDTypography
                  component={Link}
                  to="#"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Créer un compte
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </BasicLayout>
  );
}

export default Basic;
