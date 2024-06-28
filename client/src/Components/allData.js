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
  const [show, setShow] = useState(0);
  const { getUser, authenticated, currentUser } = useAuth();

  console.log("authenticated", authenticated);
  console.log("currentUser", currentUser);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (currentUser) {
      getUser();
      var emailU = currentUser.email;
      console.log("EMAILu:", emailU);
      fetch(`/account/find/${emailU}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setData(data);
          console.log("data", data);
        });
    }

    return;
  }, []);

  function handleLoad() {
    if (authenticated) {
      var emailU = currentUser.email;
      console.log("EMAILu:", emailU);
      fetch(`/account/find/${emailU}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setData(data);
          console.log("data", data);
        });

      setShow(true);

      // setTimeout(() => setShow(false), 8000);
      alert("Access approved!");
    } else {
      // setData();
      setShow(false);
      alert("Access Denied!");
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Oh my guacamole! Something's off... Looks like nobody's logged in.
          Please log in to access this info.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
    }
  }
  // var emailU = currentUser.email;
  // console.log("EMAILu:", emailU);
  // console.log("data:", data);
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
                {authenticated && show && (
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
