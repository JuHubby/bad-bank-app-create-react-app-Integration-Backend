import 'bootstrap/dist/css/bootstrap.min.css';
import { CardPersonalized, LinkPersonalizado, ButtonPersonalized } from "./context";
import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Formik } from 'formik';


function CreateAccount() {
    const [idElement,setIdElement] = useState(0)
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(true);
    const ctx = useContext(UserContext);

    // const formik = useFormik({
    //     initialValues: {
    //         name: "",
    //         lastName: "",
    //         emailField: "",
    //         pswField: "",
    //     },
    //     onSubmit: (values) => {
    //       alert("Account creation successful");
    //       console.log("form:", values);
    //     },
    //     validate: (values) => {
    //       let errors = {};
    //       if (!values.emailField) errors.emailField = "Field required";
    //       if (!values.pswField) errors.pswField = "Field required";
    //       if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailField))
    //         errors.emailField = "Username should be an email";
    //       return errors;
    //     },
    //   });

    function validate(field, label) {
        if(!field) {
            setStatus(<span class="alert alert-danger d-flex align-items-center" > <strong> Holy guacamole! </strong>    
            You should check in on the {label} field above.</span>);
            setTimeout(() => setStatus (''), 3000);
            
            return false;
        };
        // if (field == password && !field) {
        //     setStatus(<span class="alert alert-danger d-flex align-items-center" > <strong> Holy guacamole! </strong> <br/>    
        // "Field password required".</span>);
        // setTimeout(() => setStatus (''), 3000);
        // return false;
        // };
        // if(field == email && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test($('#email').val())) {
        //     setStatus(<span class="alert alert-danger d-flex align-items-center" > <strong> Holy guacamole! </strong>    
        // You should check in on the email field above.</span>); 
        //     return false;
        // }; 
        return true;
    } 

    function handleCreate() {
        
        if(!validate(name, 'Name')) return;
        if(!validate(lastName, 'Last name')) return;
        if(!validate(email, 'Email')) return;
        if(!validate(password, 'Password')) return;
        //I want to put ID in each array inside users to identifye with key and then to be able to create map fuction to find if the user exist or no, i may need to turn the id in string to aviod changes//
     
        for(let i=1; i < ctx.users.length; i++ ) {
            const keyValue = i;
            // ctx.users[i].push({...ctx.users, keyValue});
            setIdElement(keyValue);
        }
        ctx.users.push({idElement,name,email,lastName,password});


    

        console.log(idElement,name,email,lastName,password);
        setShow(false); 

    }

    function clearForm() {
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setShow(true);


    }
  
   
    return (
        <CardPersonalized
            width="50"
            header="Create your Account"
            title="Welcome to the Bank"
            center="true"
            status={status}
            body={show ? (
                <>
                <p>Please register your account and remember to submit the necessary information for saving. 
                </p> <br/>
                Name <br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)}
                ></input> <br/>
                Last Name <br/>
                <input type="input" className="form-control" id="name" placeholder="Enter lastname" value={lastName} onChange={e => setLastName(e.currentTarget.value)}
                ></input> <br/>
                Email Address <br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.currentTarget.value)}
                ></input> <br/>
                Password <br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}
                ></input> <br/>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <ButtonPersonalized
                            titleButton="Create Account"
                            handleOnclick={handleCreate}
                            />
                        </div>
                    </div>
                </div>
                </>
                ):(
                <>
                <h5 className="alert alert-success">You have successfully created your account.</h5>
                <div className="row">
                        <div className="col">
                            <ButtonPersonalized 
                            titleButton="Create Another Account"
                            handleOnclick={clearForm}
                            />
                        </div>
                    </div>
                </>
            )}
        />
    )
}

export default CreateAccount;