import React, { useState } from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import NavLinksMobile from "./NavLinksMobile";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      {drawerIsOpen === true ? (
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className="h-screen md:flex ">
            <NavLinksMobile />
          </nav>
        </SideDrawer>
      ) : (
        ""
      )}

      <MainHeader>
        <nav className="">
          <NavLinks
            drawerIsOpen={drawerIsOpen}
            setDrawerIsOpen={setDrawerIsOpen}
          />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
