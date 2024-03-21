import React, { useEffect,useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import {TextField,TextareaAutosize,styled,Button} from "@mui/material"
import '../style/home.css';
import Lottie from 'react-lottie';
import animationData from '../assets/singing-contract.json';
import { ToastContainer, toast } from "react-toastify";




const Input = styled(TextField)`
  border-radius:22px;
`

const Home = () => {
  const [name,setName] = useState(''); 
  const [email,setEmail] = useState(''); 
  const [message,setMessage] = useState(''); 

  const handleName=(e)=>{
    setName(e.target.value);
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value);
  }
  const handleMsg=(e)=>{
    setMessage(e.target.value);
  }

  const handleMessage = async()=>{
    const data = {name,email,message}
    try{
      const res = axios.post('https://colorful-red-turkey.cyclic.app/msg',data)
      toast.success("Message Sent Successfully")
    }
    catch(e){
      console.log(e)
    }
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const [selectedOptions, setSelectedOptions] = useState({
    dropdown1: '',
    dropdown2: '',
    dropdown3: '',
    dropdown4: ''
  });
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [options, setOptions] = useState([]);

  const runApi =async()=>{
    try{
      const response= await axios.get("https://colorful-red-turkey.cyclic.app/getall")
      const processedOptions = response.data.map(item => ({
        id: item._id,
        file:item.file,
        subject:item.subject,
        shift:item.shift,
        date: item.date,
        year: item.year
    }))
      setOptions(processedOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    runApi(); 
  }, []);
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [controls, inView]);

  const handleDropdownChange = (dropdown, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [dropdown]: value
    });
  };
  useEffect(() => {
        const handleScroll = () => {
          const parallaxContainer = document.querySelector('.parallax-container');
          const scrollPosition = window.scrollY;
          parallaxContainer.style.backgroundPositionY = `${scrollPosition}px`;
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

  const handleFile=()=>{
    let a;
    options.map((option)=>{
      if(selectedOptions.dropdown1==option.subject){
        if(selectedOptions.dropdown2===option.year){
          if(selectedOptions.dropdown3===option.date){
            if(selectedOptions.dropdown4===option.shift){
              a = option.file;
              window.open(`https://colorful-red-turkey.cyclic.app/getfile/${a}`, '_blank');
            }
          }
        }
      }
    })
  }
  return (
    <div>
    <div className="parallax-container">
    <div className="parallax-content">
        <h1>Welcome to Our Website</h1>
        <p>Get Previous Year Questions Of JEE Mains Easily For Free</p>
      </div>
    </div>
    <motion.div ref={ref}
      className='dropdown1'
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={controls}
        transition={{ duration: 0.7 }}
      >
        Select Your Choice
        <div className="dropdown-container">
      <select
        className="dropdown"
        value={selectedOptions.dropdown1}
        onChange={(e) => handleDropdownChange('dropdown1', e.target.value)}
      >
        <option key="1" value="">SUBJECT</option>
        <option key="2" value="Physics">PHYSICS</option>
        <option key="3" value="Chemistry">CHEMISTRY</option>
        <option key="4" value="Mathematics">MATHEMATICS</option>
      </select>

      <select
        className="dropdown"
        value={selectedOptions.dropdown2}
        onChange={(e) => handleDropdownChange('dropdown2', e.target.value)}
      >
        <option value="">YEAR</option>
        {[...new Map(options.map(option => [option.year, option])).values()].map((option) => (
          <option key={option._id} value={option.year}>
            {option.year}
          </option>
        ))}
      </select>

      <select
        className="dropdown"
        value={selectedOptions.dropdown3}
        onChange={(e) => handleDropdownChange('dropdown3', e.target.value)}
      >
        <option value="">DATE</option>
        {options.map((option) => 
        option.year === selectedOptions.dropdown2 &&(
          <option key={option._id} value={option.date}>
            {option.date}
          </option>
        ))}
      </select>
      <select
        className="dropdown"
        value={selectedOptions.dropdown4}
        onChange={(e) => handleDropdownChange('dropdown4', e.target.value)}
      >
        <option key="1" value="">SHIFT</option>
        <option key="2" value="1">SHIFT - 1</option>
        <option key="3" value="2">SHIFT - 2</option>
      </select>
    </div>
    <div style={{marginTop:'20px'}}>
    <button className="extreme-button" onClick={handleFile}>Submit</button>
    </div>
    <br/>
    Contact Us
    <br />
    <div style={{display:'flex',justifyContent:'space-around'}}>
      <div className='bggg' style={{ width: '350px',marginTop:'-50px'}}>
      <Lottie options={defaultOptions} />
      </div>
      <div className='bgg'>
      <Input id="standard-basic" label="Enter Name" value={name} onChange={handleName} type='name'/>
      <Input id="standard-basic" label="Enter Email" value={email} onChange={handleEmail} type='email'/>
      <TextareaAutosize style={{height:'15vh'}} id='standard-basic' value={message} onChange={handleMsg} placeholder="Enter Message"/>
      <Button onClick={handleMessage}>Submit</Button>
      </div>
      <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <p>&copy;2024 All Rights Reserved</p>
    </footer>
    </div>
    </motion.div>
    <ToastContainer/>
    </div>
  );
};

export default Home;
