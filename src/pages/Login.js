import React from 'react';
import { Container } from 'react-bootstrap';

const Login = () => {
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "40px" }}>
        <div className="card" style={{ width: "15%" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Logo</h4>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div className="card" style={{ width: "50%" }}>
          <div className="card-body">
            <h4 className="card-title">Login</h4>
            <div className="form-group">
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <button type="button" className="btn btn-outline-primary" style={{ marginRight: "10px" }}>Login</button>
                <button type="button" className="btn btn-outline-success">Sign Up</button>
              </div>

              <br />
              <p className="text-light">Forgot Password</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
