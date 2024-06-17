import "bootstrap/dist/css/bootstrap.min.css";
import {
  CardPersonalized,
  LinkPersonalized,
  ButtonPersonalized,
  LinkPersonalizedButtonLook,
} from "./customePersonalizedComponents";
import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./context";
import { Form, useFormik, resetForm } from "formik";
import { useAuth } from "./context";
import AllData from "./allData";

function CreateAccount() {
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const ctx = useContext(UserContext);

  console.log(
    "user.name context:",
    user.name,
    user.balance,
    user.ValAuth,
    user.email,
    user.password
  );

  return (
    <>
      <h1>Create Account {JSON.stringify(ctx)}</h1>

      <CardPersonalized
        width="50"
        textcenter="true"
        center="true"
        header=" Account Creation "
        nameButton="Save"
        hdColor="info"
        status={status}
        body={
          show ? (
            <CreateForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <CreateMsg setShow={setShow} />
          )
        }
      />
    </>
  );
}

function CreateForm(props) {
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(300);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { signUp, logOut, user } = useAuth();
  const [dissabledButton, setdissabledButton] = useState(true);

  console.log(
    "user.name context:",
    user.name,
    user.balance,
    user.ValAuth,
    user.email,
    user.password
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const initialBalance = 300;
      setBalance(initialBalance);

      var name = values.name;
      var email = values.email;
      var lastName = values.lastName;
      var password = values.password;
      console.log("user info form:", name, email, balance, password);

      setName(values.name);
      setEmail(values.email);
      setLastName(values.lastName);
      setPassword(values.password);

      console.log("user info form:", name, email, balance, password);
      console.log(
        "user.name context:",
        user.name,
        user.balance,
        user.auth,
        user.email,
        user.password
      );
      const url = "/account/create";
      console.log("after url");

      const getUsers = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const data = {
            lastName: lastName,
            email: email,
            name: name,
            password: password,
            balance: balance,
          };

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
          };

          const response = await fetch(url, requestOptions);

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
          signUp(name, email, password, balance); // firebase called

          props.setStatus("");
          alert("user account created successfully ")
          props.setShow(false);
          console.log("user info form:", name, email, balance, password);
          console.log(
            "user.name context:",
            user.name,
            user.balance,
            user.auth,
            user.email
          );
          clearForm();
          return;
        }
        props.setStatus(
          <>
            <span className="alert alert-danger d-flex align-items-center">
              {" "}
              <p>
                {" "}
                The email address is already in use. Please try another one, or
                log in to your existing account associated with that email.
              </p>
            </span>
          </>
        );
        setTimeout(() => props.setStatus(""), 3000);
      })();
      console.log("after url");
      logOut();
      return;
    },

    validate: (values) => {
      let errors = {};
      if (!values.name)
        errors.name = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> Field required</strong>
          </span>
        );

      if (!values.password) {
        errors.password = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> Field required</strong>
          </span>
        );
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          values.password
        )
      )
        errors.password = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong>
              {" "}
              The password must contain minimum 8 Characters, One Uppercase, One
              Lowercase, One Number and One Special Case Character
            </strong>
          </span>
        );
      if (!values.email) {
        errors.email = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> Field required</strong>
          </span>
        );
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> This field should include a valid email address</strong>
          </span>
        );
      }
      setdissabledButton(false);
      return errors;
    },
  });

  function clearForm() {
    formik.resetForm();
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setdissabledButton(true);
  }

  return (
    <div>
      {/* <h6>{JSON.stringify(ctx)}</h6> */}

      <form onSubmit={formik.handleSubmit}>
        <div>Name:</div>
        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></input>{" "}
        <br></br>
        {formik.errors.name ? (
          <div className="error-validation">{formik.errors.name}</div>
        ) : null}{" "}
        <br></br>
        <div>Last Name:</div>
        <input
          className="form-control"
          type="text"
          name="lastName"
          id="name"
          placeholder="Enter lastname"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        ></input>{" "}
        <br></br>
        {formik.errors.lastName ? (
          <div className="error-validation">{formik.errors.lastName}</div>
        ) : null}{" "}
        <br></br>
        <div>Email:</div>
        <input
          className="form-control"
          type="text"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          placeholder="Enter email address"
        ></input>{" "}
        <br></br>
        {formik.errors.email ? (
          <div className="error-validation">{formik.errors.email}</div>
        ) : null}{" "}
        <br></br>
        <div>Password:</div>
        <input
          className="form-control"
          id="password"
          placeholder="Enter password"
          type="text"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        ></input>{" "}
        <br></br>
        {formik.errors.password ? (
          <div className="error-validation">{formik.errors.password}</div>
        ) : null}{" "}
        <br></br>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <ButtonPersonalized
                titleButton="Create Account"
                type="submit"
                name="submitBtn"
                className="button"
                // disabled={dissabledButton ? 'disabled' : null}
                disabled={dissabledButton}
              />
              <br />
              <div className="col">
                <LinkPersonalized
                  titleButton=" or Log In?"
                  handleOnclick="#/login/"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5 className="alert alert-success">
        You have successfully created your account.
      </h5>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <LinkPersonalizedButtonLook
              titleButton="LogIn"
              handleOnclick="#/login/"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <ButtonPersonalized
              titleButton="Create Another Account"
              handleOnclick={() => props.setShow(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
