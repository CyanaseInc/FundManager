import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../docs/app.css';
import 'regenerator-runtime/runtime';
import { Button,Icon, Input } from 'atomize';

const InvestmentSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [formError, setFormError] = useState('');
  const [Mini, setMini] = useState('');
  const [InvName, setName] = useState('');
  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Save options";
  const [myText, SetText] = useState("Add details to login");
  const [buttonText, setButtonText] = useState(myOriginal);
  // Fetch options from the server
  const fetchOptions = async () => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    try {
      const response = await axios.post('https://fund.cyanase.com/fund/options.php', {
        email: loginData.email,
      });

      const options = response.data.totalClasses;
      setOptions(options);
 const myClasses = response.data.myclasses;
  
 localStorage.setItem('myclasses', JSON.stringify(myClasses));
      // Check if options are already selected by the user
      const savedOptions = getSavedOptionsFromLocalStorage();
      setSelectedOptions(savedOptions || options);
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  // Handle option selection
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    saveOptionsToLocalStorage(selected);
  };
const handleInputChange = (e, setter) => {
    setter(e.target.value);
}
  // Save options to local storage
  const saveOptionsToLocalStorage = (options) => {
    localStorage.setItem('selectedOptions', JSON.stringify(options));
  };

  // Get saved options from local storage
  const getSavedOptionsFromLocalStorage = () => {
    const savedOptions = localStorage.getItem('selectedOptions');
    return savedOptions ? JSON.parse(savedOptions) : null;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedOptions.length === 0) {
      setFormError('Please select at least one option.');
      return;
    }
    setButtonText(myChange);
    try {
      const loginData = JSON.parse(localStorage.getItem('loginData'));
      
      const data = {
        email: loginData.email,
        InvName: InvName,
        mini:Mini,
        selectedOptions: selectedOptions,
      };
      const response = await axios.post('https://fund.cyanase.com/fund/save_options.php', data);
   
 
      if(response.data.success===true){
        setFormError(response.data.message)
        setButtonText(myOriginal); 
        
        
      }else{
        setButtonText(myOriginal);
        setFormError(response.data.message)
      }
      // Handle the response from the server
    } catch (error) {
      console.error('Failed to save options:', error);
    } 
  };

  return (
  <form onSubmit={handleSubmit}>
    {formError && <p className='red'>{formError}</p>}
  
    <div> {/* Wrapping container */}
      <Input
        placeholder="investment class name"
        p={{ x: "2.5rem" }}
        onChange={(e) => handleInputChange(e, setName)}
        prefix={
          <Icon
            name="UserSolid"
            color="warning800"
            size="16px"
            cursor="pointer"
            pos="absolute"
            top="50%"
            left="0.75rem"
            transform="translateY(-50%)"
          />
        }
      />
      <br></br>
      <Input
        placeholder="minimum deposit"
        type="text"
        p={{ x: "2.5rem" }}
        onChange={(e) => handleInputChange(e, setMini)}
        prefix={
          <Icon
            name="UserSolid"
            color="warning800"
            size="16px"
            cursor="pointer"
            pos="absolute"
            top="50%"
            left="0.75rem"
            transform="translateY(-50%)"
          />
        }
      />
    </div> {/* End of wrapping container */}
    <br />

    <Select
      options={options.map((option) => ({
        value: option.id,
        label: option.name,
      }))}
      isMulti
      onChange={handleSelectChange}
      value={selectedOptions}
    />
    <br />
    <Button type="submit" m={{ t: '1rem' }} w="50%">
      {buttonText}
    </Button>
  </form>
);

};

export default InvestmentSelect;
