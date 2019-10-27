import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Icon,
  Image,
  Menu,
  Responsive,
  Sidebar,
  Button
} from "semantic-ui-react";

import { Path } from "../constants";
import logo from "../images/reel-politik-logo-1.png";
import { User } from "../types";

const Logo = () => <Image className="logo" src={logo} />;

const NavBar: React.SFC<{ mobile?: boolean }> = ({
  children,
  mobile
}): JSX.Element => (
  <div className={`navbar ${mobile ? "mobile" : "desktop"}`}>{children}</div>
);

const PageMenuItem = ({
  activePath,
  pageName,
  pagePath
}: {
  activePath?: Path;
  pageName: string;
  pagePath: Path;
}): JSX.Element => {
  const history = useHistory();
  return (
    <Menu.Item
      active={activePath == pagePath}
      key={pagePath}
      onClick={() => {
        history.push(pagePath);
      }}
    >
      {pageName}
    </Menu.Item>
  );
};

const LayoutContainer: React.SFC<{
  activePath?: Path;
  sessionUser?: User | null;
  setSessionUser: (sessionUser: User | null) => void;
}> = ({ activePath, children, sessionUser, setSessionUser }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function handleSidebarHide() {
    setSidebarOpen(false);
  }
  function handleToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  const handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(response => {
      if (response.ok) {
        setSessionUser(null);
      }
    });
  };

  const LogoutButton = () => (
    <Button basic inverted onClick={handleLogout}>
      Log Out
    </Button>
  );

  const pageMenuItems = [
    <PageMenuItem
      activePath={activePath}
      key={Path.explorePage}
      pageName="Explore"
      pagePath={Path.explorePage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.watchPage}
      pageName="Watch"
      pagePath={Path.watchPage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.myMoviesPage}
      pageName="My Movies"
      pagePath={Path.myMoviesPage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.friendsPage}
      pageName="Friends"
      pagePath={Path.friendsPage}
    />
  ];

  return (
    <div className="fill-height">
      <Responsive
        as="div"
        className="fill-height"
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {/* <<<<<<< HEAD
          <Responsive
            as={"div"}
            maxWidth={Responsive.onlyMobile.maxWidth}
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between"
            }} */}
        <Sidebar.Pushable>
          <Sidebar
            animation="overlay"
            as={Menu}
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpen}
          >
            {pageMenuItems}
          </Sidebar>
          <Sidebar.Pusher className="fill-height" dimmed={sidebarOpen}>
            <NavBar mobile>
              <div className="navbar-section">
                {Boolean(sessionUser) && (
                  <div className="menu-button">
                    <Icon name="sidebar" onClick={handleToggle} />
                  </div>
                )}
              </div>
              <div className="navbar-section">
                <Logo />
                {/* <<<<<<< HEAD
                {pageMenuItems}
                <Menu.Item position="right">
                  <LogoutButton />
                </Menu.Item>
              </Menu>
            ) : (
              <Logo />
            )}
          </Responsive>
        </div>
        <div
          className="pageContent"
          style={{ display: "flex", flexGrow: 1, padding: "1em" }}
        >
          {children}
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable> */}
              </div>
              <div className="navbar-section authentication-buttons">
                {Boolean(sessionUser) && <LogoutButton />}
              </div>
            </NavBar>
            <div className="content">{children}</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
        <NavBar>
          {Boolean(sessionUser) ? (
            <Menu pointing secondary size="large">
              <Logo />
              {pageMenuItems}
              <div className="authentication-buttons">
                <LogoutButton />
              </div>
            </Menu>
          ) : (
            <Menu pointing secondary size="large">
              <Logo />
            </Menu>
          )}
        </NavBar>
        <div className="content">{children}</div>
      </Responsive>
    </div>
  );
};

export default LayoutContainer;
