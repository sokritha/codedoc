import { Button } from "components/commons";
import "./index.css";

const NAVBAR_ITEMS = [
  {
    label: "Collections",
    path: "/collections",
  },
  {
    label: "Documentation",
    path: "/documentation",
  },
];

const Navbar = () => {
  return (
    <nav
      className="navbar is-sticky-top is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          className="navbar-item has-text-primary is-size-5-desktop"
          href="#"
        >
          CodeDOC
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-item is-size-7-desktop">Collections</div>
        <div className="navbar-item is-size-7-desktop">Documentations</div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Button
              handleOnAction={() => {
                console.log("Sign In click");
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
