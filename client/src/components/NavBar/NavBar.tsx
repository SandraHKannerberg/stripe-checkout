import LogInBtn from "../LogInBtn/LogInBtn"
import { Space, Divider, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import { NavLink } from "react-router-dom";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import "./NavBar.css"
import { useEffect, useState } from "react";
import {
  useCustomerContext,
} from "../../context/CustomerContext";


function NavBar() {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);
  const { loggedInCustomer } = useCustomerContext();

  {/*RESPONSIVE DESIGN FOR NAVBAR. DROPMENU FROM SCREEN WIDTH 520PX*/}
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 520);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const items: MenuProps['items'] = [
    {
      key: "home",
      label: (<NavLink className="homeicon" to="/"style={{ textDecoration: "none", fontSize: "16px", color: "#3C6255"}}>
          <span className="home--icon-dropdown"><HomeOutlined /> </span> Till Startsidan
        </NavLink>),
    },
    {
      key: "login",
      label: (<LogInBtn />),
    }
  ]
  

  return (
  <>
    {isSmallScreen ? (
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button type="text" className="dropdown--icon">Meny <DownOutlined></DownOutlined></Button>
        </Dropdown>
      ) : (

      <>
      <Space  size="large"> 
        <NavLink className="homeicon" to="/"style={{ textDecoration: "none"}}>
          <HomeOutlined />
        </NavLink>
          <LogInBtn></LogInBtn>
      </Space>

      <Divider type="vertical" className="divider"/> 
      </>
      )}

      {isSmallScreen && loggedInCustomer && (
        <>
        <p className="customername--small--screens">{loggedInCustomer.username}</p>
        </>
      )}
  </>
)
}

export default NavBar