import LogInBtn from "../LogInBtn/LogInBtn"
import { Space, Divider, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import { NavLink } from "react-router-dom";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import "./NavBar.css"
import { useEffect, useState } from "react";

function NavBar() {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);

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
</>
)
}

export default NavBar