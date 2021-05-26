import React, { Component } from 'react';
import MemberService from '../service/MemberService';
class FindIdPwComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            phone: "",
            pw: "",
            findid: "",
            findpw: "",
            member: []
        }
        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleNameChage = this.handleNameChage.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handlePw = this.handlePw.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ id: event.target.value });
    }
    handleNameChage = (event) => {
        this.setState({ name: event.target.value });
    }
    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value });
    }
    handlePw = (event) => {

        this.setState({
            pw: event.target.value
        })
    }
    findId(name) {
        MemberService.getOneMember(name).then((res) => {
            console.log("member = " + res.data.username)
            this.setState({
                member: res.data,
                findid: res.data.username
            });
        });
    }
    findPw(id) {
        MemberService.getOneMember(id).then((res) => {
            console.log("member = " + res.data)
            this.setState({
                member: res.data,
                findpw: res.data.password
            });
        });


    }

    gotoHome = () => {
        return this.props.history.push('/')
    }
    render() {
        return (
            <div>

                <div className="about-content mt-40">
                    <div className="single-department-two mt-30">
                        <div className="department-content text-center">
                            <h4 className="department-title">
                                ID 찾기
                            </h4>
                            <div className="about-form">
                                <input type="text" placeholder="이름" name="name" value={this.state.name} onChange={this.handleNameChage}></input>

                            </div>
                            <button className="main-btn" onClick={() => this.findId(this.state.name)}>ID 찾기</button>
                            <div> {this.state.findid}</div>

                        </div>
                        <div className="department-content text-center">
                            <h4 className="department-title">
                                PW 찾기
                            </h4>
                            <div className="about-form">

                                <input type="text" placeholder="ID" name="id" value={this.state.id} onChange={this.handleIdChange}></input>

                            </div>
                            <button type="submit" className="main-btn" onClick={() => this.findPw(this.state.id)}>PW 찾기</button>
                            <div>{this.state.findpw}</div>
                            <button type="submit" className="main-btn" onClick={this.gotoHome}>로그인하기</button>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default FindIdPwComponent;