import { createContext, useState, useEffect } from "react";


export const DataContext = createContext();

export const UserDataProvider = ({ children }) => {

  const [token, setToken] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  })

  async function logout() {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      // console.log(response)
      // const data = await response.json();
      // console.log(data)
    } catch (error) {
      console.log(error);
    }

    setToken("");
    setUser({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    });
  }

  useEffect(() => {
    async function getCookieToken() {
      try {
        const response = await fetch('/auth/token', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          const data = await response.json();
          // console.log(data.token);
          if (data.token) {
            await getUserData(data.token);
          }
          return data.token;
        } else {
          const data = await response.json();
          // console.log(data.message)
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCookieToken();

    async function getUserData(token) {
      const response = await fetch('/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'token': token
        }
      })
      if (response.ok) {
        const data = await response.json();
        // router.push('/');
        console.log("TOKEN IN GET USER DATA " + token);
        console.log(data);

        setToken(token);
        setUser({
          ...user,
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        });


      } else {
        const data = await response.json();
        // console.log(data.message.detail);
        console.log(data.message.detail);
      }
    }

  }, [token]);

  return (
    <DataContext.Provider
      value={{
        token, setToken,
        user, setUser,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};