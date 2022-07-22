import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import smLogo from "../../../public/logo.webp";

import mainAvatar from "../../assets/images/users/user4.jpg";

import useAuth from "../../../src/hooks/useAuth";
import { useRouter } from "next/router";

const Header = ({ showMobmenu, adminData }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const auth = useAuth();
  const router = useRouter();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandelar = () => {
    auth.logut({
      cb: () => {
        router.push("/login");
      },
    });
  };

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none flex-center m-0 p-0">
          <Image width={40} height={40} src={smLogo} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/">
              <a className="nav-link">Dashboard</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/articles">
              <a className="nav-link">Articles</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/services">
              <a className="nav-link">Services</a>
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div
              className="d-flex justify-conent-cnter align-items-center gap-2"
              style={{ lineHeight: "0px" }}
            >
              <p className="m-0">@{adminData.name}</p>

              <Image
                src={mainAvatar}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <p className="text-center px-3">{adminData.email}</p>
            <DropdownItem onClick={logoutHandelar}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
