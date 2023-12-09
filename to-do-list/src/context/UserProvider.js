import { createContext, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
export const UserContext = createContext();
export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const initialErr = { email: null, password: null };
  const [validationErr, setValidationErr] = useState(initialErr);
  const logInHandler = ({ email, password }) => {
    axios.get(`http://localhost:3002/users?email=${email}`).then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        const resData = res.data[0];
        if (resData.password === password) {
          setToken(resData.token);
          setValidationErr(initialErr);
        } else {
          setValidationErr({
            email: false,
            password: "Password is not correct",
          });
        }
      } else {
        setValidationErr({ email: "Email not found", password: false });
      }
    });
  };
  const SignUpHandler = ({ email, password }) => {
    axios.get(`http://localhost:3002/users?email=${email}`).then((res) => {
      if (res.status === 200 && res.data.length === 0) {
        const data = {
          id: nanoid(),
          email: email,
          password: password,
          token: nanoid(),
        };
        axios.post("http://localhost:3002/users", data).then((res) => {
          if (res.status == 201) {
            setToken(res.data.token);
          }
        });
      } else {
        setValidationErr({ ...initialErr, email: "Email is used before!" });
      }
    });
  };
  const clearErr = () => {
    setValidationErr(initialErr);
  };
  const values = {
    token,
    logInHandler,
    SignUpHandler,
    validationErr,
    clearErr,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
