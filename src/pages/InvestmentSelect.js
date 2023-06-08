import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../docs/app.css';
import 'regenerator-runtime/runtime';
import { Button,Icon } from 'atomize';

const InvestmentSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [formError, setFormError] = useState('');
  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Save options";
  const [myText, SetText] = useState("Add details to login");
  const [buttonText, setButtonText] = useState(myOriginal);
  // Fetch options from the server
  const fetchOptions = async () => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    try {
      const response = await axios.post('http://localhost/cyanase/options.php', {
        email: loginData.email,
      });

      const options = response.data.investment_Total_classes;
      setOptions(options);
 const myClases = response.data.myclasses;

 localStorage.setItem('myclasses', JSON.stringify(myClases));
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
        selectedOptions: selectedOptions,
      };
      const response = await axios.post('http://localhost/cyanase/save_options.php', data);
   

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
