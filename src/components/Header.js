import React from 'react';
import { Container, NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="lg"><Container>
        <Navbar.Brand href="/">PlaySafe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor01" />
        <Navbar.Collapse id="navbarColor01">
          <Nav className="me-auto">
            <Nav.Link href="/" active>Home</Nav.Link>
            <Nav.Link href="PeriodCal">Period Calculator</Nav.Link>
            <Nav.Link href="Pregnancy">Pregnancy</Nav.Link>
            <Nav.Link href="About">About</Nav.Link>
            <NavDropdown title="Maternal Health" id="nav-dropdown">
              <NavDropdown.Item href="Terminology">Terminology</NavDropdown.Item>
              <NavDropdown.Item href="Conception">Conception</NavDropdown.Item>
              <NavDropdown.Item href="BreastFeeding">Breast Feeding</NavDropdown.Item>
              <NavDropdown.Item href="Immunization">Immunization</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="MorningSickness">Morning Sickness</NavDropdown.Item>
              <NavDropdown.Item href="MealPlanner">Meal Planner</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Health & Info." id="nav-dropdown">
              <NavDropdown.Item href="MenstrualCycle">Menstrual Cycle</NavDropdown.Item>
              <NavDropdown.Item href="HivTips">Hiv Tips</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="Settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="TermsAndPolicy">Terms & Policy</NavDropdown.Item>
              <NavDropdown.Item href="#">Visit Our Blog</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-sm-2" />
            <Button variant="secondary" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse></Container>
      </Navbar>
    </Container>
  );
}

export default Header;
