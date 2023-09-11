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
    loggedInCustomer?: Customer | null;
    handleLogin: (customer: CustomerType) => Promise<void>;
    handleLogout: () => {},
}

const defaultValues = {
    loggedInCustomer: null,
    handleLogin: async () => {},
    handleLogout: async () => {},
}

export const CustomerContext = createContext<ICustomerContext>(defaultValues);

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }: PropsWithChildren<{}>) => {

  const [loggedInCustomer, setLoggedInCustomer] = useState<Customer | null>(null);

  //CHECKAR OM DET FINNS NÅGON INLOGGAD KUND
  useEffect(() => {
    const authorization = async () => {
      try {
        const response = await fetch("/api/customers/authorize");
        const data = await response.json();
        if (response.status === 200 || response.status === 304) {
          setLoggedInCustomer(data);
          console.log("AUTH LOG", data);
        }
 
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    };
    authorization();
  }, []);


  //HANTERAR LOGGA IN
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
 
          setLoggedInCustomer(data);
          console.log("CONTEXT", data);

          console.log("LOGGED IN CUSTOMER: ", data);
        } 
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  //HANTERAR LOGGA UT
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
      value={{ loggedInCustomer, handleLogin, handleLogout }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
