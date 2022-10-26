import React, { useContext } from "react";
// import { useStaticQuery, graphql, Link } from 'gatsby';
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import NavbarWrapper from "../../common/components/Navbar";
import Box from "../../common/components/Box";
import Container from "../../common/components/UI/Container";
import { DrawerContext } from "../../common/contexts/DrawerContext";
import ScrollSpyMenu from "../../common/components/ScrollSpyMenu";

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
  const menuItems = [
    {
      label: "בית",
      path: "/",
      offset: "70",
    },
  ];
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
            {menuItems.map((menu, index) => (
              <li key={`menu-item-${index}`}>
                <a href={menu.path}>{menu.label}</a>
              </li>
            ))}
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
