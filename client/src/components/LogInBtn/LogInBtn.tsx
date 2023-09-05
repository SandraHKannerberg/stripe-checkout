import { Button, Drawer } from 'antd';
import { useState } from 'react'
import LogInForm from '../LogInForm/LogInForm';

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
      <Button type="primary" onClick={showLogInDrawer}>
        Logga In
      </Button>
      <Drawer title="Logga in eller Bli medlem" placement="right" onClose={onClose} open={open}>
        <p>Redan medlem? Logga in här</p>
        <LogInForm></LogInForm>
        <p>Bli Medlem Här</p>
      </Drawer>
    </>
  );
};

export default LogInBtn