import { Button, Drawer } from 'antd';
import { useState } from 'react';
import LogInForm from '../LogInForm/LogInForm';
import './LogInBtn.css';
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
      {loggedInCustomer ? (
        <Button className="logout--btn" type="text" onClick={handleLogout}>
          Logga Ut
        </Button>
      ) : (
        <>
        <Button className="login--btn" type="text" onClick={showLogInDrawer}>
          Logga In/Bli Medlem
        </Button>
  
        <Drawer title="Logga in eller Bli medlem" placement="right" onClose={onClose} open={open}>
          <LogInForm></LogInForm>
        </Drawer>
        </>
      )}
  </>
);
}

export default LogInBtn