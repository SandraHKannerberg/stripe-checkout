import { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";

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
}

const defaultValues = {
    loggedInCustomer: null,
    isLoggedIn: false,
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


  //CHECKAR OM DET FINNS NÅGON INLOGGAD KUND
  const authorization = async () => {
    try {
      const response = await fetch("/api/customers/authorize");
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        setIsLoggedIn(true);
        setLoggedInCustomer(data);
        setUsername(data.username);
        console.log("AUTH LOG", data.username);
      }

    } catch (err) {
      console.log("ERROR-MESSAGE:", err);
    }
  }

  useEffect(() => {
    authorization()
  }, [isLoggedIn]);

    //HANTERAR REGISTRERING AV NY KUND
    const handleRegistrationNewCustomer = async (newCustomer: newCustomerType) => {
      if (newCustomer) {
  
        try {
          const response = await fetch("api/customers/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer),
          });
          const data = await response.json();
  
          if (response.status === 200) {
   
            console.log("NEW CUSTOMER", data);
            setSuccessInfo("Grattis! Du är nu registrerad som kund hos oss. Varmt välkommen att logga in.")
          } 

          if(response.status === 409) {

            console.log("ERROR", data);
            setErrorInfo("*Denna kund är redan registrerad. Vänligen välj ett annat användarnamn")
          }
        } catch (err) {
          console.log("ERROR-MESSAGE:", err);
        }
      }
    };
  

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
          setIsLoggedIn(true);
          setLoggedInCustomer(data);
        } 

        if (response.status === 404) {
          setErrorInfo("Ooops! Inloggning misslyckades. Felaktigt användarnamn och/eller lösenord")
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
        setIsLoggedIn(false);
        setLoggedInCustomer(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ 
        loggedInCustomer, 
        isLoggedIn,
        handleRegistrationNewCustomer, 
        handleLogin, 
        handleLogout, 
        username, setUsername, 
        email, setEmail, 
        password, setPassword, 
        successInfo, setSuccessInfo,
        errorInfo, setErrorInfo 
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
