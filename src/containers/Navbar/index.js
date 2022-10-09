import React, { useContext } from "react";
// import { useStaticQuery, graphql, Link } from 'gatsby';
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import NavbarWrapper from "../../common/components/Navbar";
import Drawer from "../../common/components/Drawer";
import Button from "../../common/components/Button";
import Logo from "../../common/components/UIElements/Logo";
import Box from "../../common/components/Box";
import HamburgMenu from "../../common/components/HamburgMenu";
import Container from "../../common/components/UI/Container";
import { DrawerContext } from "../../common/contexts/DrawerContext";
import ScrollSpyMenu from "../../common/components/ScrollSpyMenu";
import logoImage from "../../common/assets/image/logo.png";

const Navbar = ({
  navbarStyle,
  logoStyle,
  button,
  row,
  menuWrapper,
  onShow,
}) => {
  // const { onShow } = props;

  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = (props) => {
    dispatch({
      type: "TOGGLE",
    });
  };

  // const data = useStaticQuery(graphql`
  //   query {
  //     webAppCreativeJson {
  //       menu_items {
  //         label
  //         path
  //         offset
  //       }
  //     }
  //   }
  // `);
  const data = {
    webAppCreativeJson: {
      menu_items: [
        {
          label: "בית",
          path: "#home",
          offset: "70",
        },
        {
          label: "איך זה עובד",
          path: "#how-to",
          offset: "70",
        },
        {
          label: "סוגי מראות",
          path: "#features",
          offset: "70",
        },
        {
          label: "טכנולוגייה",
          path: "#technology",
          offset: "70",
        },
        {
          label: "סוגי תאורה",
          path: "#ligthing",
          offset: "70",
        },
        {
          label: "שאלות שכיחות",
          path: "#faq",
          offset: "70",
        },
      ],
    },
  };
  return (
    <NavbarWrapper {...navbarStyle}>
      <Container width="1400px">
        <Box {...row}>
          {/* <Logo
            href="#"
            logoSrc={logoImage}
            title="SaaS Creative"
            logoStyle={logoStyle}
            className="main-logo"
          /> */}
          <Box
            {...menuWrapper}
            className="mainMenuWrapper"
            style={{ justifyContent: "space-between" }}
          >
            <ScrollSpyMenu
              className="main_menu"
              menuItems={
                data.webAppCreativeJson
                  ? data.webAppCreativeJson.menu_items
                  : []
              }
              offset={-70}
            />

            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#108AFF" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={
                  data.webAppCreativeJson && data.webAppCreativeJson.menu_items
                }
                drawerClose={true}
                offset={-100}
              />
            </Drawer>

            <Link to="#" className="navbar_button navbar_button_two">
              <Button
                {...button}
                title="הזמן מראה בהתאמה אישית"
                onClick={onShow}
              />
            </Link>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    className: "web_app_creative_navbar",
    minHeight: "70px",
    display: "block",
  },
  row: {
    flexBox: true,
    alignItems: "center",
    width: "100%",
  },
  logoStyle: {
    maxWidth: ["126px", "126px"],
  },
  button: {},
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default Navbar;
