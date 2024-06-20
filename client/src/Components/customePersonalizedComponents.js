import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const defaultColor = "success";

// with: 25,50,75 or 100 or auto. colors $colors: (
// $theme-colors: (
//     "primary":    $primary,
//     "secondary":  $secondary,
//     "success":    $success,
//     "info":       $info,
//     "warning":    $warning,
//     "danger":     $danger,
//     "light":      $light,
//     "dark":       $dark
//   );

function HeaderPersonalized(props) {
  function classes() {
    const hd = props.hdColor ? `${props.hdColor}` : `light`;
    const txt = props.txtColor ? `text-${props.txtColor} ` : `text-`;
    const style = { width: "18rem" };
    return `card-header ${txt}bg-${hd} mb-3  text-ligth border-0 ${
      props.center == "true" ? "m-auto" : " "
    } float-none ${props.width ? `w-${props.width} mb-3` : ""} ${style}`;
  }

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col text-center">
    <div className="container-fluid shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <br />
      <div className={classes()}>
        <div>
          <h1> {props.header}</h1>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    );
}

function CardPersonalized(props) {
  function classes() {
    const hd = props.hdColor ? `${props.hdColor}` : defaultColor;
    const txt = props.txtColor ? `text-${props.txtColor} ` : `text-`;
    return `card-header ${txt}bg-${hd} mb-3 `;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center">
          <br />
          <div
            className={`card text-ligth shadow-lg mb-3 border border-0 ${
              props.center == "true" ? "m-auto" : " "
            } float-none ${props.width ? `w-${props.width} mb-3` : ""} `}
            style={{ width: "18rem" }}
          >
            <div className={classes()}>
              <h5>{props.header}</h5>
            </div>
            <div className="card-body">
              <div
                className={`col text-${
                  props.textCenter == "true" ? "center" : "start"
                }`}
              >
                {props.title && <h5 className="card-title">{props.title}</h5>}
                {props.text && <p className="card-text">{props.text}</p>}
                {props.image && (
                  <>
                    <img
                      src={props.image}
                      className="card-img-top"
                      alt="..."
                    ></img>{" "}
                  </>
                )}
                <br />
                {props.body}
                <br />
              </div>
              {props.status && <div id="createStatus"> {props.status}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonPersonalized(props) {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <button
              disabled={props.disabled}
              onClick={props.handleOnclick}
              className={`btn btn-${props.color ? props.color : defaultColor}`}
            >
              {props.titleButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LinkPersonalizedButtonLook(props) {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <a
              href={props.handleOnclick}
              className={`btn btn-${props.color ? props.color : defaultColor}`}
            >
              {props.titleButton}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function LinkPersonalized(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <a
              type="button"
              className="btn btn-link"
              href={props.handleOnclick}
            >
              {props.titleButton}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function LinkPersonalizedOutline(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <a
              type="button"
              className="btn btn-outline-dark"
              href={props.handleOnclick}
            >
              {props.titleButton}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLinkPers(props) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">{props.label}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <a
          ref={ref}
          {...triggerHandler}
          className="nav-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-inline-flex align-items-center"
          aria-current="page"
          href={props.href}
        >
          {" "}
          <span className="ms-1">{props.name}</span>
        </a>
      )}
    </OverlayTrigger>
  );
}

function CardLogIn(props) {
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col text-center">
            <div className="card">
              <div
                className="card text-bg-dark mb-3"
                style={{ maxWidth: "18rem;" }}
              >
                <div className="card-header">Please, Log in!</div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="card">
                    <div className="card-body">
                      You must first log in to your account to make a
                      transaction. If you're not part of the crew yet, create
                      your own account and join us!
                    </div>

                    <LinkPersonalizedButtonLook
                      titleButton="LogIn"
                      handleOnclick="#/login/"
                    />
                    <br />
                  </div>
                </li>
                <li className="list-group-item">
                  <LinkPersonalized
                    titleButton="or Sig In!"
                    handleOnclick="#/CreateAccount/"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export {
  CardPersonalized,
  ButtonPersonalized,
  LinkPersonalized,
  NavLinkPers,
  LinkPersonalizedButtonLook,
  LinkPersonalizedOutline,
  CardLogIn,
  HeaderPersonalized,
};
