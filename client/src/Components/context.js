import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth} from './firebase';
import { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext({
  name: "",
  email: "",
  password: "",
  balance: 0,
  valAuth: false,
});

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "maria",
    email: "",
    password: "",
    balance: 0,
    valAuth: false,
  });

  const login = (name, email, password, balance) => {
    signInWithEmailAndPassword( auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = user.email;

        // ...
        setUser((user) => ({
          name: name,
          email: email,
          password: password,
          balance: balance,
          valAuth: true,
        }));
        console.log("user.email from context:" ,user.email);
        console.log("user.auth from context:" ,user.valAuth);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };



  const logOut = async () => {
   try {
          await signOut();
          // Sign-out successful.
          setUser((user) => ({
              name: "",
              email: "",
              password: "",
              balance: "",
              valAuth: false,
          }));
      } catch (error) { }
};

  const signUp = (name, email, password, balance) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user Credentials:", userCredential);
      // Signed in
      const user = userCredential.user;
      // ...
      const email = user.email;
      // ...
      setUser((user) => ({
        name: name,
        email: email,
        password: password,
        balance: balance,
        valAuth: false,
      }));
      console.log("user.email from context:" ,user.email);
    })
    .catch((error) => {
      console.log(error.message);
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

  const getUser = (nameFetch, emailFetch, passwordFetch, balanceFetch) => {
    setUser((user) => ({
      name: nameFetch,
      email: emailFetch,
      password: passwordFetch,
      balance: balanceFetch,
      valAuth: true,
    }));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // The user object has basic properties such as display name, email, etc.

        const email = user.email;
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getIdToken() instead.
        const idToken = user.getIdToken();

        // ...
      } else {
        // User is signed out
        // ...
        console.log("User is not logged in");
      }
    });
  };

  const value = {
    setUser,
    user,
    getUser,
    login,
    logOut,
    signUp,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
