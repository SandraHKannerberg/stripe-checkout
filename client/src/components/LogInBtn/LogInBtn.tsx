import { Button, Drawer } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import LogInForm from "../LogInForm/LogInForm";
import "./LogInBtn.css";
import {
  useCustomerContext,
} from "../../context/CustomerContext";

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
        <p className="logged--in--box--text">Välkommen</p> 
        <Button className="log--btn" type="text" onClick={showLogInDrawer}>
          Logga In/Bli Medlem
        </Button>
      </div> 
    </div>

    <Drawer title="Logga in eller Bli medlem" placement="right" onClose={onClose} open={open}>
      <LogInForm></LogInForm>
    </Drawer>
    </>
  }
  </>
);
}

export default LogInBtn