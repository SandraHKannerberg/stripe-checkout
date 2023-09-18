import LogInBtn from "../LogInBtn/LogInBtn"
import ShoppingCartIconBtn from "../ShoppingCartIconBtn/ShoppingCartIconBtn"
import { Space, Divider } from "antd"
import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "./NavBar.css"
import { useState } from "react";

function NavBar() {

  return (

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

  )
}

export default NavBar