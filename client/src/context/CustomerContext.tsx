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
    confirmLogin: string;
    setConfirmLogin: React.Dispatch<React.SetStateAction<string>>;
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
    confirmLogin: "",
    setConfirmLogin: () => {},
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
  const [confirmLogin, setConfirmLogin] = useState("");
  const [errorLogin, setErrorLogin] = useState("");


  //CHECKAR OM DET FINNS NÅGON INLOGGAD KUND
  const authorization = async () => {
    try {
      const response = await fetch("/api/customers/authorize");
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
          const data = await response.json(); //Vad göra med denna data?
  
          if (response.status === 200) {
            setSuccessInfo("Grattis! Du är nu registrerad som kund hos oss. Varmt välkommen att logga in.")
            console.log(data)
          } 

          if(response.status === 409) {
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
          setLoggedInCustomer(data);
          setConfirmLogin("Du är nu inloggad")
        } 

        if (response.status === 404 || response.status === 401 ) {
          setErrorLogin("Ooops! Inloggning misslyckades. Felaktigt användarnamn och/eller lösenord")
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
        confirmLogin, setConfirmLogin, 
        errorLogin, setErrorLogin 
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
