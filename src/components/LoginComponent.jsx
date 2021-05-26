import React, { Component } from "react";
import { useRouteMatch } from "react-router-dom";
import ApiService from "../service/BoardService";
import AuthService from "../service/AuthService";
import axios from "axios";
import { API_URL } from "../service/ApiUrl";

const LOGIN_API_URL = API_URL + "authenticate";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      message: null,
      loggedIn: false,
      error: false,
    };
  }

  handleusernameChange = (event) => {
    event.preventDefault();
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleError = () => {
    this.setState({
      error: false,
    });
  };

  userLogin = (e) => {
    e.preventDefault();
    const reqBody = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(LOGIN_API_URL, reqBody)
      .then((response) => {
        console.log(response.data.jwt);
        ApiService.fetchToken(response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.jwt));
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log("error");
        window.alert("아이디나 비밀번호가 다릅니다")
      });

  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  gotoFindIDPW = () => {
    return this.props.history.push('/find')
  }

  gotoSignup = () => {
    return this.props.history.push('/Signup')
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Login </h2>
        <form>
          <div className="about-content mt-40">
            <div className="about-form">

              <input
                type="text"
                placeholder="username"
                name="username"
                style={{ alignContent: "center", width: "600px", marginLeft: "220px", marginBottom: "0px" }}
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="about-form">

              <input
                type="password"
                placeholder="password"
                name="password"
                style={{ alignContent: "center", width: "600px", marginLeft: "220px", marginTop: "0px", marginBottom: "0px" }}
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

          </div>
          <div style={{ textAlign: "center" }}>
            <button className="main-btn" type="submit" style={{ alignContent: "center", width: "600px", marginTop: "0px", marginBottom: "0px" }} onClick={this.userLogin}>
              Login User
          </button>
          </div>
          <br />
          <div style={{ textAlign: "center", display: "inline" }} >
            <p style={{ display: "inline", textAlign: "right", marginLeft: "670px" }} onClick={this.gotoFindIDPW}>
              ID/PW 찾기 |
          </p>

            <p style={{ display: "inline", textAlign: "right" }} onClick={this.gotoSignup}>
              회원가입
          </p>
          </div>


        </form>
      </div>
    );
  }
}

export default LoginComponent;