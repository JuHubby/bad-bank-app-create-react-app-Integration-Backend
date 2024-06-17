import { ButtonPersonalized, CardPersonalized, LinkPersonalized, LinkPersonalizedersonalized, LinkPersonalizedOutline } from "./customePersonalizedComponents";
import Login from "./logIn";


function Home() {

    return (
        
        <div className="container-fluid">
            <div className="row position-relative">
                <div className="col ">
                    <div className="position-relative top-50 start-50 translate-middle">
                        <CardPersonalized
                            width="75"
                            header="Welcome to the Bank"
                            // title="Welcome to the Bank"
                            text="You can use this Bank App as a mobile application that lets you access your bank account from anywhere, at any time "
                            image="bank.png"   
                            textCenter="true"      
                        />
                    </div>
                </div>
                <div className="col "> 
                    <div className="position-relative top-50 start-50 translate-middle">
                        <h2><strong>$300 checking bonus on us!</strong><br/></h2>
                        <h4><span>New customers open an eligible checking account with qualifying electronic deposits</span></h4>
                        <br/>
                        <LinkPersonalizedOutline
                        titleButton="Get started >>"
                        handleOnclick="#/CreateAccount/"
                        />
                    </div>
                </div>
                <div className="col "> 
                    <div className="position-relative top-50 start-50 translate-middle">
                    <Login/>
                    </div>
                </div>
            </div>
        </div>             
        
    )
}

export default Home;