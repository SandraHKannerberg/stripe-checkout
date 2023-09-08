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
    isLoggedIn?: Customer | null;
    handleLogin: (customer: CustomerType) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const defaultValues = {
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
    isLoggedIn: null,
    handleLogin: async () => {},
    handleLogout: async () => {},
}

export const CustomerContext = createContext<ICustomerContext>(defaultValues);

export const useCustomerContext = () => useContext(CustomerContext);


export const CustomerProvider = ({ children }: PropsWithChildren<{}>) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<Customer | null>(null);

  // useEffect(() => {
  //   const authorization = async () => {
  //     try {
  //       const response = await fetch("/api/customers/authorize");
  //       const data = await response.json();
  //       if (response.status === 200 || response.status === 304) {
  //         setloggedInCustomer(data);
  //         console.log(loggedInCustomer)
  //       }
 
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   authorization();
  // }, []);

  // const login = async (customer : CustomerType) => {
  //   if (customer) {
  //     try {
  //       console.log(customer)
  //       const response = await fetch("api/customers/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(customer),
  //       });
  //       console.log(response)

  //       const data = await response.json();
  //       console.log(data)
 
  //       if (response.status === 200) {
  //         setloggedInCustomer(data);
  //       } 
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  useEffect(() => {
    console.log("loggedInCustomer changed:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Handle successful login here (e.g., update user state, redirect, etc.)
      } else {
        console.log("Something went wrong")
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      // Handle network or other errors
      console.log(error);
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
        setIsLoggedIn(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ username, setUsername, password, setPassword, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
