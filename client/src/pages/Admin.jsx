//This page is made by Aman Sinha
import { TextField,styled,Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import "../style/admin.css"
import axios from "axios";
import Input from '@mui/material/Input';

const In = styled(TextField)`
        margin-top:30px;
        font-size:20px
    `
const I = styled(Input)`
    width:220px;
    border:1px solid grey;
    color:black;
    background-color:white;
`

const Btn = styled(Button)`
        margin-top:30px;
        border-radius:22px;
    ` 

const Admin = ()=>{
    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [shift, setShift] = useState('');

    const [isNotVerified,setisNotVerified] = useState(true);
    const [password,setPassword] = useState('')
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const handleShiftChange = (e) => {
        setShift(e.target.value);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleChange=(e)=>{
        setPassword(e.target.value)
    }
    const OpenAdmin=()=>{
        setisNotVerified(false)
    }
    const handleClick=async()=>{
        try{
            const response  = await axios.post('https://colorful-red-turkey.cyclic.app/check', {password:password})
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
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('subject',subject);
        formData.append('year', year);
        formData.append('date', date);
        formData.append('shift', shift);
        formData.append('file', file);
        if(!file ||!year||!shift||!date){
            alert('Please Fill Everything');
            return;
        }
        try {
            await axios.post('https://colorful-red-turkey.cyclic.app/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSubject('')
            setYear('')
            setDate('')
            setShift('')
            setFile(null)
            alert('Collection uploaded successfully');
        } catch (error) {
            console.error('Error uploading collection:', error);
            alert('Error uploading collection');
        }
    };

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
            <In value={password} onChange={handleChange} id="standard-basic" label="Enter The Password" type='password' variant="standard" />
            </div>
            <div className='btn'>
            <Btn onClick={handleClick} variant="contained">Submit</Btn>
            </div>
        </div>
        <ToastContainer />
        </div>
         ):(
            <div className='adm'>
            <div className='welcome'>Welcome To Admin Panel</div>
            <div className='fl'>
                <I type="text" value={subject} placeholder='Enter Subject'  onChange={handleSubjectChange} required />
                <I type="text" value={year} placeholder='Enter Year'  onChange={handleYearChange} required />
                <I type="date" value={date} placeholder='Enter Date' onChange={handleDateChange} required />
                <I type="text" value={shift} placeholder='Enter Shift' onChange={handleShiftChange} required/>
                <I type='file' required onChange={handleFileChange}/>
            </div>
            <div className='btn'>
            <Btn onClick={handleSubmit} variant="contained">Submit</Btn>
            </div>            
            </div>
         )}
        </>
    )
}

export default Admin;