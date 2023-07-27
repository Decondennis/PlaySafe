import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPhone, faCalendar, faTimeline, faClock } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios';

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalT, setShowModalT] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [daysInAdvance, setDaysInAdvance] = useState(1);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalT = () => {
    setShowModalT(true);
  };

  const openDatePickerModal = () => {
    setShowDatePickerModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDatePickerModal(false);
    setShowModalT(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDaysInAdvanceChange = (event) => {
    setDaysInAdvance(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
  
    // Create the data object to send to the backend
    const dataToSave = {
      user_id: 'user_id_placeholder', // Replace this with the actual user ID
      name: name,
      phone: phone,
    };
  
    // Make a POST request to the backend route with the data
    axios
      .post('http://localhost:5000/med_personel_contact', dataToSave)
      .then((response) => {
        console.log('Data saved to the database:', response.data);
        // Optionally, you can show a success message or reset the form here
      })
      .catch((error) => {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        // Optionally, you can show an error message here
      });
  };
  

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="card mb-3 col-sm-6" style={{ marginTop: '60px' }}>
          <div className="card mb-3">
            <h3 className="card-header">Settings</h3>
            <div className="card-body">
              <Button variant="link" onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} size="2x" />
              </Button>
              <h5 className="card-title">Medical Personnel Contact</h5>
            </div>
            <div className="card-body">
                <FontAwesomeIcon icon={faPhone} /> Grace Dennis <br></br>08093810206
            </div>
            <div className="list-group list-group-flush">
              <h5 style={{ marginTop: '10px' }} className="card-title">Calculator Reminder</h5>
              <div className="card-body">
                <p className="card-text">
                  <FontAwesomeIcon icon={faTimeline} /> Days in Advance: {daysInAdvance}<br />
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={daysInAdvance}
                    onChange={handleDaysInAdvanceChange}
                  />
                  <br></br>
                  <Button variant="link" onClick={openDatePickerModal}>
                  <FontAwesomeIcon icon={faClock} /> Time of the day
                  </Button>
                </p>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Antenatal Reminder<br />
                
                <Button variant="link" onClick={openModalT}>
                  <FontAwesomeIcon icon={faCalendar} /> Appointment date
                </Button>
              </h5>
              <p className="card-text">
                  <FontAwesomeIcon icon={faClock} /> Time of the day
              </p>
            </div>
            <div className="card-footer text-muted">2 days ago</div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add A Medical Personal</Modal.Title>
  </Modal.Header>
  <form onSubmit={handleSubmit}>
    <Modal.Body>
      <div className="card-body">
        <div className="form-group">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeModal}>
        Close
      </Button>
      <div className="d-grid gap-2" style={{ marginTop: '20px', marginBottom: '10px' }}>
        <button className="btn btn-lg btn-primary" type="submit">
          Save
        </button>
      </div>
    </Modal.Footer>
  </form>
</Modal>




      <Modal show={showModalT} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date and Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div className="form-group">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control mb-3"
                placeholderText="Select a date"
              />
              <TimePicker
                value={selectedTime}
                onChange={handleTimeChange}
                showSeconds={false}
                step={15}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDatePickerModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Remainder Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div className="form-group">
            <TimePicker
                value={selectedTime}
                onChange={handleTimeChange}
                showSeconds={false}
                step={15}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Settings;
