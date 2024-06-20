import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext, useAuth } from "./context";
import {
  ButtonPersonalized,
  CardPersonalized,
} from "./customePersonalizedComponents";


function MyData() {
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const ctx = useContext(UserContext);
  const { getUser, authenticated, setAuthenticated, user } = useAuth();

  // useEffect(() => {
  //   fetch("/account/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData({ users: data });
  //     });
  // }, []);

  useEffect(() => {
    var email = user.email;
    fetch(`/account/find/${email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  async function handleLoad() {
    const response = await getUser();

    console.log("authenticated", authenticated);

    if (response) {
      return setLoaded(true);
    }
    // console.log(ctx.users);
    // setLoaded(true);
    else {
      // change settimeout for async function
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Oh my guacamole! Something's off... Looks like nobody's logged in.
          Please log in to access this info.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
    }
    console.log("loaded", loaded);
    // setLoaded(true);
  }

  return (
    <CardPersonalized
      width="auto"
      header="Summary Accounts"
      title="Data Table"
      nameButton="Save"
      hdColor="dark"
      center="true"
      status={status}
      body={
        <>
          {/* {JSON.stringify(ctx)} */}
          <ButtonPersonalized
            titleButton="Retrieve data"
            handleOnclick={handleLoad}
          />
          <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {authenticated && 
                
                (
                  <tr>
                    <th scope="row" >
                    </th>
                    <td>{data[0]._id}</td>
                    <td>{data[0].name}</td>
                    <td>{data[0].lastName}</td>
                    <td>{data[0].email}</td>
                    <td>{data[0].password}</td>
                    <td>{data[0].balance}</td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}

export default MyData;
