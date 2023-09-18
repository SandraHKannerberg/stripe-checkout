import LogInBtn from "../LogInBtn/LogInBtn"
import ShoppingCartIconBtn from "../ShoppingCartIconBtn/ShoppingCartIconBtn"
import { Space, Divider, Button, Dropdown, Row } from "antd"
import type { MenuProps } from 'antd';
import { NavLink } from "react-router-dom";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import "./NavBar.css"
import { useEffect, useState } from "react";

function NavBar() {
  const smallScreenBreakpoint = 585;
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < smallScreenBreakpoint
  );

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < smallScreenBreakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []); 

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<NavLink className="homeicon" to="/"style={{ textDecoration: "none", fontSize: "18px", color: "#3C6255"}}><p>Till Startsidan</p></NavLink>),
    },
    {
      key: '2',
      label: (<LogInBtn></LogInBtn>),
    },
  ];

  return (
    <>

      {isSmallScreen ? (
      
        <Row style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", height: "6rem"}}>
          <p><ShoppingCartIconBtn></ShoppingCartIconBtn></p>
          <Dropdown menu={{ items }} placement="bottom">
            <Button type="text" style={{backgroundColor: "inherit", color: "#3C6255", display: "flex", justifyContent:"center", alignItems:"center", marginRight:"2.3rem"}}><p className="dropdown--icon"><DownOutlined /></p></Button>
          </Dropdown>
        </Row>
  
      ) : (

        <Space style={{marginBottom : "0.3rem", display:"flex", justifyContent:"flex-end"}}>
          <Space  size="large"> 
            <NavLink className="homeicon" to="/"style={{ textDecoration: "none"}}>
              <HomeOutlined />
            </NavLink>
            <LogInBtn></LogInBtn>
          </Space>

          <Divider type="vertical" className="divider"/> 
          <ShoppingCartIconBtn></ShoppingCartIconBtn>
      </Space>
  )}
</>

)
}

export default NavBar