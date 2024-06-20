import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
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
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] =useState(false);
  const [user, setUser] = useState({
    name: "maria",
    email: "",
    password: "",
    balance: 0,
    valAuth: false,
  });

  const login = (name, email, password, balance) => {
    signInWithEmailAndPassword(auth, email, password)
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
        console.log("user.email from context:", user.email);
        console.log("user.auth from context:", user.valAuth);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser((user) => ({
          name: "",
          email: "",
          password: "",
          balance: "",
          valAuth: false,
        }));
        setAuthenticated(false);
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
        // ...
        setUser((user) => ({
          name: name,
          email: email,
          password: password,
          balance: balance,
          valAuth: false,
        }));
        logOut();
        console.log("user.email from context:", user.email);
      })
      .catch((error) => {
        console.log(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  const getUser = () => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken()
        .then((idToken) => {
          console.log("idToken:", idToken);
          //async "iffe" function -> auto-executes
          (async () => {
            let response = await fetch("/auth", {
              method: "GET",
              headers: {
                Authorization: idToken,
              },
            });
            let text = await response.text();
            console.log("response:", response);
            setAuthenticated(true);
            return;
          })();
        })
        .catch((e) => {
            setAuthenticated(false);
            console.log("e:", e);})
    } else {
        setAuthenticated(false);
        console.log("setAuthentication:" , authenticated);
        alert("There is currently no logged in user. Unable to call Auth Route.")
      console.warn(
        "There is currently no logged in user. Unable to call Auth Route."
      );
    }
  };

  //   const getUser = () => {
  //     currentUser.getIdToken().then(function(idToken) {
  //         // Send token to your backend via HTTPS
  //         // ...
  //         console.log('idToken:', idToken);
  //         (async () => {
  //             let response = await fetch('/auth', {
  //                 method: 'GET',
  //                 headers: {
  //                     'Authorization': idToken
  //                 }
  //             });
  //             let text = await response.text();
  //             console.log('response:', response);

  //         })();

  //       }).catch(function(error) {
  //         // Handle error
  //         console.log('error:', error);
  //       });
  //   };

  //   const getUser = (name, email, password, balance) => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         console.log("user", user);
  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/v8/firebase.User
  //         var uid = user.uid;
  //         // The user object has basic properties such as display name, email, etc.

  //         const email = user.email;
  //         // The user's ID, unique to the Firebase project. Do NOT use
  //         // this value to authenticate with your backend server, if
  //         // you have one. Use User.getIdToken() instead.
  //         const idToken = user.getIdToken();
  //         try {
  //           if (idToken) {
  //             //async "iffe" function -> auto-executes
  //             // ...
  //             setUser((user) => ({
  //               name: name,
  //               email: email,
  //               password: password,
  //               balance: balance,
  //               valAuth: false,
  //             }));
  //           }

  //         } catch (err) {
  //           console.log(err);
  //         }

  //       } else {
  //         // User is signed out
  //         // ...
  //         console.log("User is not logged in");
  //       }
  //     });
  //   };

  const isAdmin = (name, email, password, balance) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        var uid = user.uid;
        // The user object has basic properties such as display name, email, etc.

        const email = user.email;
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getIdToken() instead.
        const idToken = user.getIdToken();
        try {
          if (idToken) {
            //async "iffe" function -> auto-executes
            (async () => {
              let response = await fetch("/auth", {
                method: "GET",
                headers: {
                  Authorization: idToken,
                },
              });
              let text = await response.text();
              console.log("response:", response);
              //   routeMsg.innerHTML = text;
            })();
          }
        } catch (err) {
          console.log(err);
        }

        // ...
        setUser((user) => ({
          name: name,
          email: email,
          password: password,
          balance: balance,
          valAuth: true,
        }));
      } else {
        // User is signed out
        // ...
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    setUser,
    user,
    getUser,
    login,
    logOut,
    signUp,
    authenticated,
    setAuthenticated
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
