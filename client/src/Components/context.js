import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import  auth from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { initializeServerApp } from "firebase/app";



const initValues = {
  name: "",
  balance: 0,
};
export const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : initValues;
};

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (name, email, password, balance) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const email = user.email;
            console.log("email from context:", email);
            console.log("user.email from context:", user.email);
            console.log("user.auth from context:", user.valAuth);
            setCurrentUser(userCredential.user);
            setUser((user) => ({
              name: name,
              balance: balance,
            }));

            return user;
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthenticated(false);
        setUser((user) => ({
          name: "",
          balance: 0,
        }));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const signUp = (name, email, password, balance) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user Credentials:", userCredential);
        // Signed in
        const user = userCredential.user;
        // ...
        const email = user.email;

        console.log("user.email from context:", user.email);
        logOut();
      })
      .catch((error) => {
        console.log(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setCurrentUser(user);
        try {
          const idToken = user.accessToken;
          console.log("idToken:", idToken);

          (async () => {
            let response = await fetch("/auth", {
              method: "GET",
              headers: {
                Authorization: idToken,
              },
            });
            let text = await response.text();
            console.log("response:", text);
            // setCurrentUser(user);
            // console.log("currentuser:", currentUser);
            setAuthenticated(true);
            // setCurrentUser(user);

            return;
          })();
        } catch (err) {
          console.log(err);
          setAuthenticated(false);
          // setCurrentUser(user);
          alert("Wrong token. Unable to call Auth Route.");
        }
        return currentUser;
      } else {
        // User is signed out
        // ...
        console.log("User is not logged in");
        setAuthenticated(false);
   

      }
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("currentuser:", currentUser);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    login,
    logOut,
    signUp,
    authenticated,
    setAuthenticated,
    currentUser,
    loading,
    user,
    setUser,
    getUser,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
