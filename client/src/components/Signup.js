import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

const Signup = (props) => {
    const [cred, setcred] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useHistory()
    const onChange = (e)=>{
        setcred({...cred, [e.target.name]: e.target.value})
    }

    const successGoogle= async (res)=>{
        const response = await fetch('http://localhost:5000/api/auth/googleSignup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({tokenId: res.tokenId }),
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            history.push("/") 
            props.showAlert("Account created successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const failureGoogle=()=>{

    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: cred.name,email: cred.email,password: cred.password }),
          });
          const json = await response.json();
          if(json.success){
              //redirect
              localStorage.setItem('token',json.authToken)
              history.push("/") 
              props.showAlert("Account created successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    return (
        <div className="mt-3">
            <h1>Signup to iNotebook</h1>
            <form onSubmit={handleSubmit} className="my-4" >
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={cred.name} onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={cred.email} onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value = {cred.password} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" value = {cred.cpassword} onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary mx-2">Submit</button>
            <GoogleLogin
                clientId="420087876462-t4h4mpsa859b05f8mah08ci5us77isd5.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={successGoogle}
                onFailure={failureGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </form>
        </div>
    )
}

export default Signup
