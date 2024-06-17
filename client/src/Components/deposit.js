import {
  CardPersonalized,
  ButtonPersonalized, LinkPersonalized, CardLogIn
} from "./customePersonalizedComponents";
import React from "react";
import { useState, useContext } from "react";
import { useAuth } from "./context";

function Deposit() {
  const ctx = useAuth();
  const { user } = useAuth();

  return (
    <>
      <p>Context share {JSON.stringify(ctx)}</p>

      {user.ValAuth ? (
        <DepositAuth />
      ) : (
        <CardLogIn/>
      )}
    </>
  );
}

export function DepositAuth() {
  const { user, setUser, login, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(true);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState();
  const [depositAmount, setDepositAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);

  function validate(field, label) {
    if (!field) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Holy guacamole! You should check in on the {label} field above.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);

      return false;
    }
    if (field <= 0) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Ups! You're not able to deposit a negative amount. Please choose a
          positive number.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(depositAmount, "Deposit Amount")) return;
    // i will think that setbalance is going to be setvariable after addign setdeposit and then push to usercontext object somehow//
    // const balance = balancebefore + depositAmount;
    const totalBalanceSofar = parseInt(depositAmount) + parseInt(balance);
    setBalance(totalBalanceSofar);

    var email = user.email;
    var amount = depositAmount;
    const url = `/account/update/${email}/${amount}`;

    const getUserUpdated = async () => {
      try {
        const response = await fetch(url);
        if (response.status != 200) {
          throw new Error(
            `something went wrong, status code: ${response.status}`
          );
        }
        const userInfo = await response.json();
        return userInfo;
      } catch (err) {
        console.log(err);
      }
    };

    (async () => {
      const userInfo = await getUserUpdated();
      if (userInfo) {
        console.log("data updated:" + JSON.stringify(userInfo)); // Now you have access to the data
        var name = userInfo.value.name; //it helps with the delay of usestate
        var balance = userInfo.value.balance;

        setEmail(() => userInfo.value.email);
        setPassword(() => userInfo.value.password);
        setBalance(() => userInfo.value.balance);
        setName(() => userInfo.value.name);
        login(name, email, password, balance);

        setUser((prev) => ({ ...prev, balance: balance }));
        clearForm();
        return setDisplay(false);
      }
      setStatus(
        <>
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <p> Error </p>
          </span>
        </>
      );
      setTimeout(() => setStatus(""), 3000);
    })();
    setDisplay(false);
  }

  function clearForm() {
    setDepositAmount("");
    setDisplay(true);
  }

  return (
    <>
      <h1> </h1>
      <CardPersonalized
        wide="50"
        header="Deposit"
        center="true"
        status={status}
        body={
          display ? (
            <>
              <h1>Hello {user.name}!</h1>
              <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                Please select an amount without decimals.
              </div>
              <br />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <h5>Balance</h5>
                  </div>
                  <div className="col">
                    <h5>{"$ " + user.balance}</h5>
                  </div>
                </div>
              </div>
              Deposit Amount <br />
              <input
                type="number"
                className="form-control"
                id="depositAmount"
                placeholder="Enter Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.currentTarget.value)}
              ></input>{" "}
              <br />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <ButtonPersonalized
                      disabled={!depositAmount}
                      titleButton="Deposit"
                      handleOnclick={handleDeposit}
                    />
                  </div>
                  <br />
                  <div className="col">
                    <ButtonPersonalized
                      titleButton="Logout"
                      handleOnclick={() => signOut()}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* add emoji happy */}
              {/* <i className="bi bi-emoji-smile"></i> */}
              <h5 className="alert alert-success text-center">
                The deposit was successful.
              </h5>
              <br />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <h5>Your new balance is:</h5>
                  </div>
                  <div className="col">
                    <h5>{"$ " + user.balance}</h5>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col">
                  <ButtonPersonalized
                    titleButton="Make a new deposit."
                    handleOnclick={clearForm}
                  />
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
}

export default Deposit;
