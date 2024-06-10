import { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";
import { useCartContext } from "./CartContext";

export interface Customer {
    id: string;
    username: string;
    email: string;
    password: string;
};

export type newCustomerType = {
  email: string;
  username: string;
  password: string;
};

export type CustomerType = {
    username: string;
    password: string;
};

interface ICustomerContext {
    loggedInCustomer?: Customer | null;
    isLoggedIn: boolean;
    authorization: () => void,
    handleRegistrationNewCustomer: (newCustomer: newCustomerType) => Promise<void>;
    handleLogin: (customer: CustomerType) => Promise<void>;
    handleLogout: () => {},
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    successInfo: string;
    setSuccessInfo: React.Dispatch<React.SetStateAction<string>>;
    errorInfo: string;
    setErrorInfo: React.Dispatch<React.SetStateAction<string>>;
    errorLogin: string;
    setErrorLogin: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues = {
    loggedInCustomer: null,
    isLoggedIn: false,
    authorization: () => {},
    handleRegistrationNewCustomer: async () => {},
    handleLogin: async () => {},
    handleLogout: async () => {},
    username: "",
    setUsername: () => {},
    email: "",
    setEmail: () => {},
    password: "",
    setPassword: () => {},
    successInfo: "",
    setSuccessInfo: () => {},
    errorInfo: "",
    setErrorInfo: () => {},
    errorLogin: "",
    setErrorLogin: () => {},
}

export const CustomerContext = createContext<ICustomerContext>(defaultValues);

export const useCustomerContext = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }: PropsWithChildren<{}>) => {

  const [loggedInCustomer, setLoggedInCustomer] = useState<Customer | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const {getOrders} = useCartContext();


  //CHECK IF SOMEONE IS LOGGED IN
  const authorization = async () => {
    try {
      const response = await fetch("/api/customers/authorize", { 
        // mode: 'no-cors' 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
      const customerData = await response.json();
      if (response.status === 200 || response.status === 304) {
        setLoggedInCustomer(customerData);
      }

    } catch (err) {
      console.log("ERROR-MESSAGE:", err);
    }
  }

  useEffect(() => {
    authorization()
  }, []);

    //REGISTRATION - NEW CUSTOMER
    const handleRegistrationNewCustomer = async (newCustomer: newCustomerType) => {
      if (newCustomer) {
  
        try {
          const response = await fetch("api/customers/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include', 
            body: JSON.stringify(newCustomer),
          });
          await response.json();
  
          if (response.status === 200) {
            setSuccessInfo("Grattis! Du är nu registrerad som kund hos oss. Varmt välkommen att logga in.")
          } 

          if(response.status === 409) {
            setErrorInfo("*Denna kund är redan registrerad. Vänligen välj ett annat användarnamn")
          }
        } catch (err) {
          console.log("ERROR-MESSAGE:", err);
        }
      }
    };
  

  //HANDLE LOG IN
  const handleLogin = async (customer: CustomerType) => {
    if (customer) {

      try {
        const response = await fetch("api/customers/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include', 
          body: JSON.stringify(customer),
        });
        const data = await response.json();

        if (response.status === 200) {
          setLoggedInCustomer(data);
          getOrders();
        }

        if (response.status === 404 || response.status === 401 ) {
          setErrorLogin("Ooops! Inloggning misslyckades. Felaktigt användarnamn och/eller lösenord")
        }

      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  //HANDLE LOG OUT
  const handleLogout = async () => {

    try {
      const response = await fetch("api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
      });

      if (response.status === 204) {
        setIsLoggedIn(false);
        setLoggedInCustomer(null);
        setUsername("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ 
        loggedInCustomer, 
        authorization,
        isLoggedIn,
        handleRegistrationNewCustomer, 
        handleLogin, 
        handleLogout, 
        username, setUsername, 
        email, setEmail, 
        password, setPassword, 
        successInfo, setSuccessInfo,
        errorInfo, setErrorInfo, 
        errorLogin, setErrorLogin 
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
