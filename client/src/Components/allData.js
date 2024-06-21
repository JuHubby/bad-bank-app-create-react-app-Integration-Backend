import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext, useAuth } from "./context";
import {
  ButtonPersonalized,
  CardPersonalized,
} from "./customePersonalizedComponents";

function AllData() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const ctx = useContext(UserContext);
  const { getUser, authenticated, setAuthenticated, user } = useAuth();

  console.log("authenticated", authenticated);

  useEffect(() => {
    var email = user.email;
    fetch(`/account/find/${email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  function handleLoad() {
    function resolveAfterGetInfo() {
      return new Promise((resolve, reject) => {
        resolve(getUser());
      });
    }

   resolveAfterGetInfo();
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
                {authenticated && (
                  <tr>
                    <th scope="row"></th>
                    <td>{data[0]._id}</td>
                    <td>{data[0].name}</td>
                    <td>{data[0].lastName}</td>
                    <td>{data[0].email}</td>
                    <td>{data[0].password}</td>
                    <td>{data[0].balance}</td>
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
