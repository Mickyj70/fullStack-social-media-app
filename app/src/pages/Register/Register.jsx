import { useState } from "react";
import "../../styles/register.css"

const Register = () => {
     const [options, setOptions] = useState("login")


  return (
    <div className="RegisterSection">
      <div className="registerContainer">
        <div className="phoneImages">
          <img src="/register/phone.svg" />
        </div>
        <div className="mainRegister">
          <div className="registerHeader">
           <img src="/register/logo.svg" alt="" />
          </div>
          <div className="registerFormContainer">
           { options ==="login" ? <Login setOptions={setOptions}/> : null}
           { options ==="register" ? <CreateAccount setOptions={setOptions}/> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

export const Login = ({setOptions}) => {
    return(
        <>
             <form className="registerForm">  
              <div className="formGroup">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="formGroup">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
             
              <div className="formGroup">
                <button type="submit">Register</button>
              </div>

              <div className="forgotpassword">
                <button>Forgot Password ?</button>
              </div>

              <div className="orContainer">
                <hr />
                <p>OR</p>
                <hr/>
              </div>

              <div className="googleLogin">
                <img src="/register/google.svg" alt="" />
                <button type="submit">Login with Google</button>
              </div>

            <div className="dontAcct">
                <p>{"Don't have an account ? "}<button onClick={()=> setOptions("register")}>Sign Up</button></p>
            </div>

            </form>


        </>
    )
}


export const CreateAccount = ({setOptions}) => {
    return(
        <>
             <form className="registerForm">
              <div className="formGroup">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="formGroup">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="formGroup">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="formGroup">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="formGroup">
                <button type="submit">Register</button>
              </div>

            <div className="dontAcct">
                <p>{"Already have an account ? "}<button onClick={()=> setOptions("login")}>Login</button></p>
            </div>
            </form>

        </>
    )
}
