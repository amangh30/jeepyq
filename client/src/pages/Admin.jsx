//This page is made by Aman Sinha
import { TextField,styled,Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import "../style/admin.css"
import axios from "axios";


const Input = styled(TextField)`
        margin-top:30px;
        font-size:20px
    `
    const Btn = styled(Button)`
        margin-top:30px;
        border-radius:22px;
    ` 

const Admin = ()=>{
    const [isNotVerified,setisNotVerified] = useState(true);
    const [password,setPassword] = useState('')
    const handleChange=(e)=>{
        setPassword(e.target.value)
    }
    const OpenAdmin=()=>{
        setisNotVerified(false)
    }
    const handleClick=async()=>{
        try{
            const response  = await axios.post('http://localhost:8000/check', {password:password})
            if(response.data.success){
                toast.success("Welcome")
                await new Promise(resolve => setTimeout(resolve, 1000))
                OpenAdmin()
            }
            else{
                toast.error("Wrong Password");
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    return(
        <>
         {isNotVerified ? (
        <div style={{display:'flex'}}>
        <div className='background'>
        </div>
        <div className='login'>
        <div className='admin'>
            <p>Admin Panel</p>
            </div>
            <div className='text'>
            <p>Login To Continue</p>
            <Input value={password} onChange={handleChange} id="standard-basic" label="Enter The Password" type='password' variant="standard" />
            </div>
            <div className='btn'>
            <Btn onClick={handleClick} variant="contained">Submit</Btn>
            </div>
        </div>
        <ToastContainer />
        </div>
         ):(<p>Welcome To Admin Page</p>)}
        </>
    )
}

export default Admin;