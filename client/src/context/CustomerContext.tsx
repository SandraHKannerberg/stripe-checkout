import { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";

export interface Customer {
    id: string;
    username: string;
    email: string;
    password: string;
};

export type CustomerType = {
    username: string;
    password: string;
};

interface ICustomerContext {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loggedInCustomer?: Customer | null;
    handleLogin: (customer: CustomerType) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const defaultValues = {
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
    loggedInCustomer: null,
    handleLogin: async () => {},
    handleLogout: async () => {},
}

export const CustomerContext = createContext<ICustomerContext>(defaultValues);

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }: PropsWithChildren<{}>) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedInCustomer, setLoggedInCustomer] = useState<Customer | null>(null);


  useEffect(() => {
    const authorization = async () => {
      try {
        const response = await fetch("/api/customers/authorize");
        const data = await response.json();
        if (response.status === 200 || response.status === 304) {
          setLoggedInCustomer(data.customer || null );
          console.log("AUTH LOG", data.customer);
        }
 
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    };
    authorization();
  }, []);


  const handleLogin = async (customer: CustomerType) => {
    if (customer) {

      try {
        const response = await fetch("api/customers/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        });
        const data = await response.json();

        if (response.status === 200) {
 
          setLoggedInCustomer(data.customer);
          console.log("CONTEXT", data);

          console.log("LOGGED IN CUSTOMER: ", data.customer);
        } 
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
        
    
    }
  };

  const handleLogout = async () => {

    try {
      const response = await fetch("api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setLoggedInCustomer(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ username, setUsername, password, setPassword, loggedInCustomer,handleLogin, handleLogout }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
