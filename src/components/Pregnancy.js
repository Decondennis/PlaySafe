import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import weeklyDevelopment from './weeklyDevelopment';
import axios from 'axios';

const Pregnancy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [estimatedDueDate, setEstimatedDueDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const calculatePregnancyWeeklyAndDueDate = () => {
    if (!selectedDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a date',
      });
      return;
    }

    const gestationalAgeInWeeks = calculateGestationalAge();
    calculateEstimatedDueDate(); // Calculate the estimatedDueDate
  };

  const calculateGestationalAge = () => {
    if (!selectedDate) {
      return { weeks: 0, dueDate: null };
    }

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - selectedDate.getTime();
    const gestationalAgeInWeeks = Math.floor(timeDifference / (1000 * 3600 * 24 * 7));
    const estimatedDueDate = new Date(selectedDate.getTime() + 280 * 24 * 60 * 60 * 1000);

    return { weeks: gestationalAgeInWeeks, dueDate: estimatedDueDate };
  };

  const calculateEstimatedDueDate = () => {
    if (!selectedDate) {
      return null;
    }

    const estimatedDueDate = new Date(selectedDate.getTime() + 280 * 24 * 60 * 60 * 1000);

    setSelectedDate(selectedDate);
    setEstimatedDueDate(estimatedDueDate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveDataToDatabase = (selectedDate, estimatedDueDate) => {
    console.log('saveDataToDatabase function called');
    console.log('Selected Date:', selectedDate);
    console.log('Estimated Due Date:', estimatedDueDate);
    const dataToSave = {
      user_id: 'user_id_placeholder', // Replace this with the actual user ID
      lmd: selectedDate,
      due_date: estimatedDueDate,
    };

    axios
      .post('http://localhost:5000/pregnancy_tracker', dataToSave)
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
  

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh', marginBottom: '30px' }}>
        <div className="card col-sm-12 col-md-8 col-lg-6">
          <div className="card-body">
            <h4 className="card-title">Pregnancy</h4>
            <div className="d-flex flex-wrap justify-content-center mt-3 mb-3">
              {/* Buttons with tooltips */}
            </div>

            <div style={{ marginTop: '50px', marginBottom: '30px' }}>
              {/* <button onClick={() => setIsOpen(true)}>Select date</button> */}
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                className="form-control"
              />
            </div>

            <div className="d-grid gap-2" style={{ marginTop: '20px', marginBottom: '10px' }}>
              <button className="btn btn-lg btn-primary" type="button" onClick={calculatePregnancyWeeklyAndDueDate}>
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Pregnancy Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Gestational Age:</h5>
            <p>{calculateGestationalAge().weeks} weeks</p>
            <h5>Due Date:</h5>
            <p>{calculateGestationalAge().dueDate && calculateGestationalAge().dueDate.toDateString()}</p>

            <h5>Weekly Development of Your Baby:</h5>
            {weeklyDevelopment
              .filter((weekInfo) => weekInfo.week === calculateGestationalAge().weeks)
              .map((weekInfo) => (
                <div key={weekInfo.week}>
                  <h6>Week {weekInfo.week}:</h6>
                  <p>{weekInfo.description}</p>
                </div>
              ))}
          </Modal.Body>

          <Modal.Footer>
          <Button variant="secondary">Set Reminder</Button>
          <Button variant="primary" onClick={() => {
            saveDataToDatabase(selectedDate, estimatedDueDate);
            closeModal();
          }}>Save & Set Reminder</Button>
          <Button variant="primary" onClick={closeModal}>Close</Button>
        </Modal.Footer>

        </Modal>
      </div>
    </Container>
  );
};

export default Pregnancy;
