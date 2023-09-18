import { Button, Drawer, Divider } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogInForm from "../LogInForm/LogInForm";
import "./LogInBtn.css";
import {
  useCustomerContext,
} from "../../context/CustomerContext";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

function LogInBtn() {

  const [open, setOpen] = useState(false);
  const { loggedInCustomer, handleLogout } = useCustomerContext();
 
  const showLogInDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
  <>

    {loggedInCustomer && 
    <>
    <div className="logged--in--container">
    <p className="usericon"><UserOutlined /></p>
      <div className="logged--in--box">
        <p className="logged--in--box--text">{loggedInCustomer.username}</p>
        <NavLink to="/orders"style={{ textDecoration: "none" }}>
          <p className="link--my--pages">Mina Sidor</p>
        </NavLink>  
        <Button className="log--btn" type="text" onClick={handleLogout}>
          Logga Ut
        </Button>
      </div>
    </div>
    </>
    }

    {!loggedInCustomer &&
    <>
    <div className="logged--in--container">
      <p className="usericon"><UserOutlined /></p>
      <div className="logged--in--box">
        <Button className="log--btn" type="text" onClick={showLogInDrawer}>
          Logga In/Bli Medlem
        </Button>
      </div> 
    </div>
    </>
  }

<Drawer title="Logga in eller Bli medlem" placement="right" onClose={onClose} open={open} style={{"backgroundImage": "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)", "color":" #3C6255"}}>
      <LogInForm></LogInForm>
      <Divider/>
      <RegistrationForm></RegistrationForm>
    </Drawer>

  </>
);
}

export default LogInBtn