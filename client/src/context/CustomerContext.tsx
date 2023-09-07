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
    login: (customer: CustomerType) => Promise<void>;
    logout: () => Promise<void>;
}

const defaultValues = {
    loggedInCustomer: null,
    login: async () => {},
    logout: async () => {},
}

export const CustomerContext = createContext<ICustomerContext>(defaultValues);

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }: PropsWithChildren<{}>) => {

  const [loggedInCustomer, setloggedInCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const authorization = async () => {
      try {
        const response = await fetch("/api/customers/authorize");
        const data = await response.json();
        if (response.status === 200 || response.status === 304) {
          setloggedInCustomer(data);
          console.log(loggedInCustomer)
        }
 
      } catch (err) {
        console.log(err);
      }
    };
    authorization();
  }, []);

  const login = async (customer : CustomerType) => {
    if (customer) {
      try {
        console.log(customer)
        const response = await fetch("api/customers/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        });
        console.log(response)

        const data = await response.json();
        console.log(data)
 
        if (response.status === 200) {
          setloggedInCustomer(data);
        } 
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logout = async () => {

    try {
      const response = await fetch("api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setloggedInCustomer(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ loggedInCustomer, login: login, logout: logout }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
