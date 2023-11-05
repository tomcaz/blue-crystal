import React from 'react';
import { Layout, Menu, theme } from 'antd';
import config from '../config';
import logo from '../resources/brand.png'
import background from '../resources/parent-background-transparent.png';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';
import { TYPE_ORGANIZATION, TYPE_PARENT, isUserRole } from '../utils/constants';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;


const DefaultLayout = () => {
  const { logoutFromServer } = useAuth();
  const navigate = useNavigate();

  const userSession = useSelector((state) => state.session.userData)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const clickMenu = ({ key }) => {
    // "Home", "Account", "Children", "Event History", "Event", "Logout"
    if (key === "home") {
      navigate('/home');
    } else if (key === "account") {
      navigate('/account');
    } else if (key === "children") {
      navigate('/children');
    } else if (key === "event history") {
      navigate('/eventHistory');
    } else if (key === "event") {
      navigate('/event');
    } else if (key === "logout") {
      logoutFromServer()
    } else if (key === "organization") {
      navigate('/orgs');
    }
  }

  let menus = ["Home", "Account"]
  if (isUserRole(userSession.role, TYPE_PARENT)) menus = [...menus, "Children", "Event History", "Event", "Logout"];
  if (isUserRole(userSession.role, TYPE_ORGANIZATION)) menus = [...menus, "Organization", "Event History", "Event", "Logout"];

  return (
    <Layout style={styles.layout}>
      <Header
        style={{
          display: 'block',
          background: 'inherit'
        }}
      >
        <img src={logo} alt="site logo" width={100} style={{ float: 'left' }} />
        <Menu
          onClick={clickMenu}
          theme="light"
          style={{ background: "transparent", border: 0, float: 'right' }}
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menus.map((name, index) => {
            const key = name.toLowerCase();
            return {
              key,
              label: `${name}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {config.app.title} ©2023 Created by Jude Studio
      </Footer>
    </Layout>

  );
};

const styles = {
  demoLogo: {
    backgroundImage: 'url(../resources/brand.png)',
    width: 100,
    height: 100
  }, layout: {
    background: `url(${background}) repeat`,
  }
}
export default DefaultLayout;