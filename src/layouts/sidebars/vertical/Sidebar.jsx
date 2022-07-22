import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "social",
    href: "/social",
    icon: "bi bi-snapchat",
  },
  {
    title: "Articles",
    href: "/articles",
    icon: "bi bi-card-text",
  },
  {
    title: "Services",
    href: "/services",
    icon: "bi bi-patch-check",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;
  const auth = useAuth();

  const logoutHandelar = () => {
    auth.logut({
      cb: () => {
        curl.push("/login");
      },
    });
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, idx) => (
            <NavItem key={idx} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
          <NavItem className="sidenav-bg" onClick={logoutHandelar}>
            <a className="nav-link text-secondary py-3 cu-pointer">
              <i className="bi bi-box-arrow-left"></i>
              <span className="ms-3 d-inline-block">logout</span>
            </a>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
