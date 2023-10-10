import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [rol, setRol] = useState(false);
  const [name, setName] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);

  const autentificare = useCallback(
    (uid, token, rol2, name2, expirationDate) => {
      // setIsLoggedIn(true);
      console.log("== " + rol2 + " == " + name2);
      setToken(token);
      setUserId(uid);
      setRol(rol2);
      setName(name2);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          rol: rol2,
          name: name2,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );
  const dezautentificare = useCallback(() => {
    //setIsLoggedIn(false);
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRol(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(dezautentificare, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, dezautentificare, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      autentificare(
        storedData.userId,
        storedData.token,
        storedData.rol,
        storedData.name,
        new Date(storedData.expiration)
      );
    }
  }, [autentificare]);

  return { token, autentificare, dezautentificare, userId, rol, name };
};
