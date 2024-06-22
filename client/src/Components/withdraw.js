import {
  CardPersonalized,
  ButtonPersonalized,
  LinkPersonalized,
  CardLogIn,
} from "./customePersonalizedComponents";
import React from "react";
import { useState, useContext } from "react";
import { useAuth } from "./context";
import { defaultBalance } from "./logIn";
import CardLink from "react-bootstrap/esm/CardLink";

function Withdraw() {
  const { currentUser } = useAuth();
  const ctx = useAuth();

  return (
    <>
      {/* <p>Context share {JSON.stringify(ctx)}</p> */}

      {currentUser ? (
        <WithdrawAuth />
      ) : (
        <>
          <CardLogIn />
        </>
      )}
    </>
  );
}

export function WithdrawAuth() {
  const { currentUser, login, signOut, setUser, user } = useAuth();
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(true);
  const [balance, setBalance] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [password, setPassword] = useState("");
  const [name, setName] = useState();

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

  function validate(field, label) {
    if (!field) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> Holy guacamole! </strong>
          You should check in on the {label} field above.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field >= 0) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Oops! You can't withdraw a -0 or positive amount. Please select a
          negative number instead.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    } else if (Math.abs(field) > Math.abs(user.balance)) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Ups! You do not have enough funds for this withdrawal amount.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function handleWithdraw() {
    if (!validate(withdrawalAmount, "withdraw Amount")) return;
    // i will think that setbalance is going to be setvariable after addign setwithdraw and then push to usercontext object somehow//
    // const balance = balancebefore + withdrawalAmount;
    const totalBalanceSofar = parseInt(balance) + parseInt(withdrawalAmount);

    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

    setBalance(totalBalanceSofar);
    var email = currentUser.email;
    var amount = withdrawalAmount;
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
    setWithdrawalAmount("");
    setDisplay(true);
  }

  return (
    <>
      {/* <h1>Hello {user.name}!</h1> */}
      <CardPersonalized
        header={`Hello ${user.name} !`}
        width="auto"
        nameButton="Save"
        hdColor="dark"
        textCenter="true"
        status={status}
        body={
          <>
            <p class="fs-1">Welconme to your Bank!</p>
            <CardPersonalized
              width="75"
              header="Withdraw"
              center="true"
              hdColor="danger"
              status={status}
              body={
                display ? (
                  <>
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
                          <h5>{USDollar.format(user.balance)}</h5>
                        </div>
                      </div>
                    </div>
                    Withdrawal amount: <br />
                    <input
                      type="number"
                      className="form-control"
                      id="withdrawalAmount"
                      placeholder="Enter Amount"
                      value={withdrawalAmount}
                      onChange={(e) =>
                        setWithdrawalAmount(e.currentTarget.value)
                      }
                    ></input>{" "}
                    <br />
                    <div className="container text-center">
                      <div className="row">
                        <div className="col">
                          <ButtonPersonalized
                            disabled={!withdrawalAmount}
                            titleButton="Withdraw"
                            handleOnclick={handleWithdraw}
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
                      The withdraw was successful.
                    </h5>
                    <br />
                    <div className="container text-center">
                      <div className="row">
                        <div className="col">
                          <h5>Your new balance is:</h5>
                        </div>
                        <div className="col">
                          <h5>{USDollar.format(balance)}</h5>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col">
                        <ButtonPersonalized
                          titleButton="Initiate a new withdrawal."
                          handleOnclick={clearForm}
                        />
                      </div>
                    </div>
                  </>
                )
              }
            />
          </>
        }
      />
    </>
  );
}

export default Withdraw;
