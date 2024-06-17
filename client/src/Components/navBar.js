import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLinkPers } from './customePersonalizedComponents';



function NavBar () {


    return (
        <>
        <div className='hero'>
        <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
            <a id="logo" className="navbar-brand" href="#"> BadBank</a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav nav-underline nav-fill">
                <li className="nav-item">
                <NavLinkPers 
                href="#/CreateAccount/"
                name="Create Account"
                label="Create New Account"
                />
                </li>
                <li className="nav-item">
                <NavLinkPers 
                href="#/login/"
                name="Login"
                label="Sing In"
                />
                </li>
                <li className="nav-item">
                <NavLinkPers 
                href="#/deposit/"
                name="Deposit"
                label="Deposit funds"
                />
                </li>
                <li className="nav-item">
                <NavLinkPers 
                href="#/withdraw/"
                name="Withdraw"
                label="Withdraw funds"
                />
                </li>
                <li className="nav-item">
                <NavLinkPers 
                href="#/alldata/"
                name="All Data"
                label="Data Table"
                />  
                </li>
             
            </ul>
            </div>
            
        </div>
        </nav>
        </div>
        
        <br/>
        </>
        
    )
}

export default NavBar;
