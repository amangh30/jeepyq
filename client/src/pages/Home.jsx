import React, { useEffect,useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from "axios"
import '../style/home.css';

const Home = () => {
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
      const response= await axios.get("http://localhost:8000/getall")
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
              window.open(`http://localhost:8000/getfile/${a}`, '_blank');
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
        <option value="">SUBJECT</option>
        <option value="Physics">PHYSICS</option>
        <option value="Chemistry">CHEMISTRY</option>
        <option value="Mathematics">MATHEMATICS</option>
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
        <option value="">SHIFT</option>
        <option value="1">SHIFT - 1</option>
        <option value="2">SHIFT - 2</option>
      </select>
    </div>
    <div style={{marginTop:'20px'}}>
    <button class="extreme-button" onClick={handleFile}>Submit</button>
    </div>
    </motion.div>
    </div>
  );
};

export default Home;
