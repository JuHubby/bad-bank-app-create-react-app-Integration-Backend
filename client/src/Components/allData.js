import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext, useAuth } from "./context";
import {
  ButtonPersonalized,
  CardPersonalized,
} from "./customePersonalizedComponents";

function AllData() {
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const ctx = useContext(UserContext);
  const { getUser, authenticated, setAuthenticated } = useAuth();

  console.log("authenticated", authenticated);

  useEffect(() => {
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setData({ users: data });
      });
  }, []);

  function handleLoad() {
    function resolveAfterGetInfo() {
      return new Promise((resolve, reject) => {
        getUser();
      });
    }

    async function asyncCall() {
      console.log("calling");
      const result = await resolveAfterGetInfo();
      console.log(result);
      return result;
    }
    const response = asyncCall();

    if (response) {
      return setLoaded(true);
    }
    // setLoaded(true)
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
                  data.users.map((user, i) => (
                    <tr>
                      <th scope="row" key={user.i}>
                        {i}
                      </th>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.balance}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}

export default AllData;
