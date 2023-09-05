import { Button, Drawer } from 'antd';
import { useState } from 'react';
import LogInForm from '../LogInForm/LogInForm';
import './LogInBtn.css';

function LogInBtn() {

  const [open, setOpen] = useState(false);

  const showLogInDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="menu--btn" type="primary" onClick={showLogInDrawer}>
        Logga In
      </Button>
      <Drawer title="Logga in eller Bli medlem" placement="right" onClose={onClose} open={open}>
        <LogInForm></LogInForm>
      </Drawer>
    </>
  );
};

export default LogInBtn