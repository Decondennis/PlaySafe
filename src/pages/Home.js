import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    gender: 'male',
    password: '',
    confirmPassword: '',
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Perform form validation here if needed
    // ...

    // Send the form data to the server
    axios.post('http://localhost:5000/users', formData)
      .then((response) => {
        console.log('Signup successful!', response.data);
        closeModal(); // Close the modal after successful signup
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <Container>
      <div style={{ marginTop: '60px' }}>
        <h2>Example body text</h2>
        <p>
          Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
        </p>
        <p>
          <small>This line of text is meant to be treated as fine print.</small>
        </p>
        <p>The following is <strong>rendered as bold text</strong>.</p>
        <p>The following is <em>rendered as italicized text</em>.</p>
        <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <button type="button" class="btn btn-primary"  onClick={openModal}>Click To Sign-Up</button>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>

      <div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body">
              <div className="form-group">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email" // Add name attribute to the email input
                    value={formData.email}
                    onChange={handleChange} // Update form data on change
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                {/* Add name attributes to the radio inputs */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="optionsRadios1"
                    value="male"
                    checked={formData.gender === 'male'} // Check the appropriate radio based on form data
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="optionsRadios1">
                    Male
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="optionsRadios2"
                    value="female"
                    checked={formData.gender === 'female'} // Check the appropriate radio based on form data
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="optionsRadios2">
                    Female
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password" // Add name attribute to the password input
                    value={formData.password}
                    onChange={handleChange} // Update form data on change
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingConfirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword" // Add name attribute to the confirm password input
                    value={formData.confirmPassword}
                    onChange={handleChange} // Update form data on change
                  />
                  <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSubmit}>SignUp</Button>
            <Button href="Login" variant="primary">Login</Button>
          </Modal.Footer>
        </Modal>
      </div>

    </Container>
  );
}

export default Home;