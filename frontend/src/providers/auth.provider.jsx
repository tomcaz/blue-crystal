import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/auth";
import { useCookies } from "react-cookie";
import { logout, validate } from "../api/login";
import { Spin } from 'antd';
import { updateToken } from "../api/fetch";


const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState();
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      const idToken = cookies.token;
      validate(idToken).then(data => {
        if (data.data.status === 'OK') {
          setToken_(idToken)
          updateToken(idToken)
        } else {
          removeCookie('token')
        }
        setLoading(false)
      }).catch(error => {
        console.log('error')
        setLoading(false)
        removeCookie('token')
      })
    } else {
      setLoading(false)
    }
  })

  // Function to set the authentication token
  const setToken = (newToken, refreshToken) => {
    setCookie('token', newToken, { secure: true })
    setCookie('refreshToken', refreshToken, { secure: true })
    setToken_(newToken);
  };
  const logoutFromServer = () => {
    removeCookie('token')
    logout()
    setToken(undefined)
  }

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logoutFromServer
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    loading === true ?
      <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
      :
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )

};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthProvider;