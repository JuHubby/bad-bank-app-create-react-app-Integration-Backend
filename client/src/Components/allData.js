import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext, useAuth } from "./context";
import {
  ButtonPersonalized,
  CardPersonalized,
} from "./customePersonalizedComponents";

function AllData() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState();
  const ctx = useContext(UserContext);
  const { getUser, authenticated, setAuthenticated, user, currentUser } =
    useAuth();

  console.log("authenticated", authenticated);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

  function handleLoad() {
    //   function resolveAfterGetInfo() {
    //     return new Promise((resolve, reject) => {
    //       resolve(getUser());
    //     });
    //   }

    //  resolveAfterGetInfo();

    if (currentUser) {
      const getUsers = async () => {
        try {
          var email = currentUser.email;
          const response = await fetch(`/account/find/${email}`);

          if (response.status != 200) {
            throw new Error(
              `something went wrong, status code: ${response.status}`
            );
          }
          const users = await response.json();
          return users;
        } catch (err) {
          console.log(err);
        }
      };

      console.log("after url");
      (async () => {
        const users = await getUsers();
        if (users) {
          console.log("data updated after fetching:" + JSON.stringify(users)); // Now you have access to the data

          setData(users);
          console.log(data);
          
          return;
        }
        console.warn(
          "There is currently no logged in user. Unable to call Auth Route."
        );
        setStatus(
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            Oh my guacamole! Something's off... Looks like nobody's logged in.
            Please log in to access this info.
          </span>
        );
        setTimeout(() => setStatus(""), 3000);
      })();
      console.log("after url");
      return;
    }
    console.warn(
      "There is currently no logged in user. Unable to call Auth Route."
    );
    setStatus(
      <span className="alert alert-danger d-flex align-items-center">
        {" "}
        Oh my guacamole! Something's off... Looks like nobody's logged in.
        Please log in to access this info.
      </span>
    );
    setTimeout(() => setStatus(""), 3000);
    
  }
  console.log("data:", data);
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
                  <th scope="col">Account Number</th>
                  <th scope="col">Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {data && (
                  <tr>
                    <th scope="row"></th>
                    <td>{data[0]._id}</td>
                    <td>{data[0].name}</td>
                    <td>{data[0].lastName}</td>
                    <td>{data[0].email}</td>
                    <td>{data[0].password}</td>
                    <td>{USDollar.format(data[0].balance)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}

export default AllData;
