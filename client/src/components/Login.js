import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

const Login = (props) => {
    const [cred, setcred] = useState({email:"",password:""})
    let history = useHistory()
    const onChange = (e)=>{
        setcred({...cred, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: cred.email,password: cred.password }),
          });
          const json = await response.json();
          if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken)
            props.showAlert("Logged in successfully","success")
            history.push("/")
          }
          else{
              props.showAlert("Invalid Credentials","danger")
          }
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
            props.showAlert("Login Successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const failureGoogle=()=>{

    }


    return (
        <div className="mt-3">
            <h1>Login to iNotebook</h1>
            <form onSubmit={handleSubmit} className="my-4">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={cred.email} onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value = {cred.password} onChange={onChange}/>
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

export default Login
