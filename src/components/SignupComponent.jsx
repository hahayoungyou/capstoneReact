import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class SignupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            pw: null,
            role: 'ROLE_USER',
            radioGroup: {
                Doctor: false,
                NonDoctor: true
            }
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleRadio = this.handleRadio.bind(this)
        this.handlePw = this.handlePw.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePw = (event) => {

        this.setState({
            pw: event.target.value
        })
    }

    gotoHome() {
        return this.props.history.push('/');

    }
    gotoHome2 = (event) => {
        event.preventDefault();
        let usernames;
        console.log(this.state.radioGroup);
        if (this.state.radioGroup == "Doctor") {
            usernames = "Doc" + this.state.username
        }
        else {
            usernames = this.state.username
        }
        let User = {
            username: usernames,
            password: this.state.pw,
            roles: 'ROLE_USER',
            active: true
        };
        if (User.username == null || User.username.length < 5 || User.username.length > 20) {
            window.alert("ID는 5~20자 이어야 합니다")
        }
        else if (User.password == null || User.password.length < 5 || User.password.length > 20) {
            window.alert("Password는 5~20자 이어야 합니다")
        }

        else {
            BoardService.SignUp(User).then(res => {
                this.props.history.push('/');
                window.alert("회원가입에 성공했습니다")
            });
        }


    }
    handleRadio = (event) => {
        let obj = {} // erase other radios
        obj[event.target.value] = event.target.checked // true —- target.checked 속성을 이용해서 라디오 버튼이 선택되었는지 여부를 확인한다.
        this.setState({ radioGroup: event.target.value })
        console.log(event.target.value)
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 ">
                        <div className="call-action d-lg-flex justify-content-between align-items-center">
                            <div className="action-content text-center">
                                <h3 className="action-title">
                                    회원가입
                                </h3>
                                <div className="about-content mt-40">
                                    <form action="/" method="post">


                                        <div className="about-form">


                                            <input type="text" placeholder="ID는 5~20자" name="id"
                                                onChange={this.handleIdChange} ></input>

                                            <input type="text" placeholder="PW는 5~20자" name="pw" onChange={this.handlePw}></input>

                                            <input type="radio" style={{ width: "23px", height: "23px" }}
                                                name="radioGroup"
                                                value='Doctor'
                                                checked={this.state.radioGroup['Doctor']}
                                                onChange={this.handleRadio} />전문가
                                        <input type="radio" style={{ width: "23px", height: "23px" }}
                                                name="radioGroup"
                                                value='Nondoctor'
                                                checked={this.state.radioGroup['NonDoctor']}
                                                onChange={this.handleRadio} />
                                        비전문가

                                    </div>
                                        <div className="container text-center">
                                            <div className="row">
                                                <button type="submit" className="main-btn" style={{ display: "inline", position: "absolute", right: "10%" }} onClick={this.gotoHome2}>

                                                    가입
                                            </button>

                                                <button type="submit" className="main-btn" style={{ display: "inline", position: "absolute", right: "0%" }} onClick={() => this.gotoHome()}>
                                                    취소
                                            </button>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default SignupComponent;