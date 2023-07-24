import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

const PeriodCal = () => {
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip);
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [countmens, setCountmens] = useState(28);
  const [countcycle, setCountcycle] = useState(4);
  const [nextPeriodStartDate, setNextPeriodStartDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Next Period');
  const [showModal, setShowModal] = useState(false);
  const [fertileStartDate, setFertileStartDate] = useState(null);
  const [fertileEndDate, setFertileEndDate] = useState(null);
  const [safeStartDate, setSafeStartDate] = useState(null);
  const [safeEndDate, setSafeEndDate] = useState(null);
  const [safeStartDateB, setSafeStartDateB] = useState(null);
  const [safeEndDateB, setSafeEndDateB] = useState(null);
  const [boyChildStartDate, setBoyChildStartDate ] = useState(null);
  const [boyChildEndDate, setBoyChildEndDate ] = useState(null);
  const [girlChildStartDate, setGirlChildStartDate ] = useState(null);
  const [girlChildEndDate, setGirlChildEndDate ] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [resultDescription, setResultDescription] = useState(0);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const incrementCountmens = () => {
    setCountmens((prevCountmens) => prevCountmens + 1);
  };

  const decrementCountmens = () => {
    if (countmens > 1) {
      setCountmens((prevCountmens) => prevCountmens - 1);
    }
  };

  const incrementCountcycle = () => {
    setCountcycle((prevCountcycle) => prevCountcycle + 1);
  };

  const decrementCountcycle = () => {
    if (countcycle > 1) {
      setCountcycle((prevCountcycle) => prevCountcycle - 1);
    }
  };

  const saveDataToDatabase = (resultDescription, selectedOption, selectedDate) => { 
    console.log('saveDataToDatabase function called');
    const dataToSave = {
      type: selectedOption,
      lmd: selectedDate,
      result: resultDescription, 
    };
  
    
    axios
      .post('http://localhost:5000/period-tracker', dataToSave)
      .then((response) => {
        console.log('Data saved to the database:', response.data); 
        setIsDataSaved(true); 
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error submitting data:', error.response.data);
        } else {
          console.error('Error submitting data:', error.message); 
        }
      });
  };

  const handleCalculateButtonClick = async () => {
    try {
      if (!selectedDate) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select a date',
        });
        return;
      }
  
      setShowProgressBar(true); // Show the progress bar
  
      const interval = setInterval(() => {
        setProgressPercentage((prevPercentage) => {
          const newPercentage = prevPercentage + 1;
          if (newPercentage >= 100) {
            clearInterval(interval);
            setShowProgressBar(false); // Hide the progress bar
            return 0;
          }
          return newPercentage;
        });
      }, 30); // Update the progress every 30 milliseconds
  
      let calculatedResult;
    let resultDescription; // Define the variable to store the result description

    // Calculate the result and set resultDescription and calculatedResult
    if (selectedOption === 'Next Period') {
      CalculateNextPeriodStartDate();
      const nextPeriodStartDate = addDays(selectedDate, countmens);
      calculatedResult = { nextPeriodStartDate };
      resultDescription = `Next period will start on ${nextPeriodStartDate.toDateString()}`;
    } else if (selectedOption === 'Fertility') {
      calculateFertileDays();
      const fertileStart = addDays(selectedDate, 10);
      const fertileEnd = addDays(selectedDate, 15);
      calculatedResult = { fertileStart, fertileEnd };
      resultDescription = `Your fertile days are from ${fertileStart.toDateString()} to ${fertileEnd.toDateString()}`;
    } else if (selectedOption === 'Safe Sex') {
      calculateSafeDays();
      const safeStart = addDays(selectedDate, countcycle);
      const safeEnd = addDays(selectedDate, 9);
      const safeStartB = addDays(selectedDate, 15);
      const safeEndB = addDays(selectedDate, countmens - 1);
      calculatedResult = { safeStart, safeEnd, safeStartB, safeEndB };
      resultDescription = `Your safe days are from ${safeStart.toDateString()} to ${safeEnd.toDateString()} and ${safeStartB.toDateString()} to ${safeEndB.toDateString()}`;
    } else if (selectedOption === 'Boy Child') {
      calculateBoyChild();
      const fertileStart = addDays(selectedDate, 10);
      const startBoyChild = addDays(fertileStart, 2);
      const endBoyChild = addDays(fertileStart, 3);
      calculatedResult = { startBoyChild, endBoyChild };
      resultDescription = `To conceive a boy, try between ${startBoyChild.toDateString()} and ${endBoyChild.toDateString()}`;
    } else if (selectedOption === 'Girl Child') {
      calculateGirlChild();
      const fertileStart = addDays(selectedDate, 10);
      const startGirlChild = addDays(fertileStart, 0);
      const endGirlChild = addDays(fertileStart, 3);
      calculatedResult = { startGirlChild, endGirlChild };
      resultDescription = `To conceive a girl, try between ${startGirlChild.toDateString()} and ${endGirlChild.toDateString()}`;
    }
  
      setTimeout(() => {
        clearInterval(interval);
        setShowProgressBar(false);

        setResultDescription(resultDescription);
        setSelectedOption(selectedOption);
        setSelectedDate(selectedDate);
  
        setShowModal(true);
      }, 1000);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  

  const CalculateNextPeriodStartDate = () => {
    const nextPeriodStartDate = addDays(selectedDate, countmens);
    setNextPeriodStartDate(nextPeriodStartDate);
    setShowModal(true);
  };
  

  const calculateFertileDays = () => {
    const fertileStart = addDays(selectedDate, 10);
    const fertileEnd = addDays(selectedDate, 15);
    setFertileStartDate(fertileStart);
    setFertileEndDate(fertileEnd);
    setShowModal(true);
  };

  const calculateSafeDays = () => {
    const safeStart = addDays(selectedDate, countcycle); // Start of the safe days
    const safeEnd = addDays(selectedDate, 9); // End of the safe days
    const safeStartB = addDays(selectedDate, 15);
    const safeEndB = addDays(selectedDate, countmens - 1);

    setSafeStartDate(safeStart);
    setSafeEndDate(safeEnd);
    setSafeStartDateB(safeStartB);
    setSafeEndDateB(safeEndB);
    setShowModal(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setNextPeriodStartDate(null);
    setFertileStartDate(null);
    setFertileEndDate(null);
    setSafeStartDate(null);
    setSafeEndDate(null);
  };

  const calculateBoyChild = () => {
    const fertileStart = addDays(selectedDate, 10);
    const startBoyChild = addDays(fertileStart, 2);
    const endBoyChild = addDays(fertileStart, 3);

    setBoyChildStartDate(startBoyChild);
    setBoyChildEndDate(endBoyChild);
    setShowModal(true);
  };

  const calculateGirlChild = () => {
    const fertileStart = addDays(selectedDate, 10);
    const startGirlChild = addDays(fertileStart, 0);
    const endGirlChild = addDays(fertileStart, 3);

    setGirlChildStartDate(startGirlChild);
    setGirlChildEndDate(endGirlChild);
    setShowModal(true);
  };

  const successMessage = (
    <div className="alert alert-success" role="alert">
      Data submitted successfully!
    </div>
  );

  return (
    <Container>
      <h4 style={{ marginTop: '50px', marginBottom: '20px' }}>Period Calculator</h4>
      <div className="btn-group d-flex justify-content-center flex-wrap" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value="Next Period" checked={selectedOption === 'Next Period'} onChange={handleOptionChange} />
        <label className="btn btn-outline-primary flex-grow-1 flex-sm-grow-0" htmlFor="btnradio1">Next Period</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value="Safe Sex" checked={selectedOption === 'Safe Sex'} onChange={handleOptionChange} />
        <label className="btn btn-outline-primary flex-grow-1 flex-sm-grow-0" htmlFor="btnradio2">Safe Sex</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" value="Fertility" checked={selectedOption === 'Fertility'} onChange={handleOptionChange} />
        <label className="btn btn-outline-primary flex-grow-1 flex-sm-grow-0" htmlFor="btnradio3">Fertility</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" value="Boy Child" checked={selectedOption === 'Boy Child'} onChange={handleOptionChange} />
        <label className="btn btn-outline-primary flex-grow-1 flex-sm-grow-0" htmlFor="btnradio4">Boy Child</label>
        <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" value="Girl Child" checked={selectedOption === 'Girl Child'} onChange={handleOptionChange} />
        <label className="btn btn-outline-primary flex-grow-1 flex-sm-grow-0" htmlFor="btnradio5">Girl Child</label>
      </div>

      {/* Progress bar */}
      {showProgressBar && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    <div style={{ width: '60%' }}>
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}>
          <span className="progress-text">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  </div>
)}


      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Menstrual start date"
          className="form-control"
        />
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">Cycle<br /> Length</h4>
              <h6 className="card-subtitle mb-2 text-muted">Set Your Cycle<br /> Length</h6>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={decrementCountmens} className="btn btn-light me-2">-</button>
                <input
                  type="text"
                  value={countmens}
                  readOnly
                  style={{ maxWidth: '80px', width: '100%', textAlign: 'center' }}
                  className="form-control text-black"
                />
                <button onClick={incrementCountmens} className="btn btn-secondary ms-2">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">Period<br /> Length</h4>
              <h6 className="card-subtitle mb-2 text-muted">Set Your <br />Menstrual Length</h6>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={decrementCountcycle} className="btn btn-light me-2">-</button>
                <input
                  type="text"
                  value={countcycle}
                  readOnly
                  style={{ maxWidth: '80px', width: '100%', textAlign: 'center' }}
                  className="form-control text-black"
                />
                <button onClick={incrementCountcycle} className="btn btn-secondary ms-2">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2" style={{ marginTop: '20px', marginBottom: '10px' }}>
        <button className="btn btn-lg btn-primary" type="button" onClick={handleCalculateButtonClick}>
          Calculate
        </button>
      </div>

      <div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Period Details</Modal.Title>
            {isDataSaved && successMessage}
          </Modal.Header>
          <Modal.Body>
            {selectedOption === 'Next Period' && (
              <div>
                <h5>Next Period Start Date:</h5>
                <p>{nextPeriodStartDate && nextPeriodStartDate.toDateString()}</p>
              </div>
            )}
            {selectedOption === 'Fertility' && (
              <div>
                <h5>Fertile Start Date:</h5>
                <p>{fertileStartDate && fertileStartDate.toDateString()}</p>
                <h5>Fertile End Date:</h5>
                <p>{fertileEndDate && fertileEndDate.toDateString()}</p>
              </div>
            )}
            {selectedOption === 'Safe Sex' && (
              <div>
                <h5>Safe Days:</h5>
                <p>{safeStartDate && safeStartDate.toDateString()} - {safeEndDate && safeEndDate.toDateString()}</p>
                And 
                <p>{safeStartDateB && safeStartDateB.toDateString()} - {safeEndDateB && safeEndDateB.toDateString()}</p>
              </div>
            )}
             {selectedOption === 'Boy Child' && (
              <div>
                <h5>Days To Concive Boy Child:</h5>
                <p>{boyChildStartDate && boyChildStartDate.toDateString()} - {boyChildEndDate && boyChildEndDate.toDateString()}</p>
              </div>
            )}
            {selectedOption === 'Girl Child' && (
              <div>
                <h5>Days To Concive Girl Child:</h5>
                <p>{girlChildStartDate && girlChildStartDate.toDateString()} - {girlChildEndDate && girlChildEndDate.toDateString()}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary">Set Reminder</Button>
            <Button variant="primary" onClick={() => saveDataToDatabase(resultDescription, selectedOption, selectedDate)}>Save & Set Reminder</Button>
            <Button variant="primary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        
      </div>
    </Container>
  );
};

export default PeriodCal;
