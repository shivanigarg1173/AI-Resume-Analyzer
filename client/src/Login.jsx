import { useState } from "react";
import axios from "axios";

function Login(){
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const handlelogin = async() =>{
       try{
        const res = await axios.post(
            "http://localhost:8000/api/auth/login",
            {
                email,
                password
            }
        );
            console.log(res.data);
        localStorage.setItem("token",res.data.token);
      
     
       }catch(error){
        console.log(error);
       }
    };

    return(
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="enter email" value={email} 
            onChange={(e)=>setemail(e.target.value)}/>
            <br/>
            <br/>
            <input type="password" placeholder="enter password" value={password}
             onChange={(e)=>setpassword(e.target.value)}/>
            <br/>
            <br/>
            <button onClick={handlelogin}>Login</button>
        </div>
    );
}

export default Login;