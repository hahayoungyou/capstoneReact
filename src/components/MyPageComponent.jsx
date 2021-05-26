import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import MemberService from '../service/MemberService';
class MyPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ' ',
            password: '',
            isDeveloperModalOn: false,
        }
    }
    componentDidMount() {
        BoardService.getUserName().then((res) => {
            console.log("id is " + res.data)
            this.setState({
                id: res.data
            });
            MemberService.getOneMember(this.state.id).then((res) => {
                this.setState({
                    password: res.data.password
                })
            })
        });

    }
    gotoHome = () => {
        this.props.history.push('/')
    }
    handleDeveloperModal = (e) => {

        window.alert("개발자 : 김예원, 김한빛, 조하영");

    }
    communityRules = () => {
        window.alert("비방, 욕설 금지")
    }

    deleteMember = () => {

        if (window.confirm("정말로 회원탈퇴하시겠습니까?\n탈퇴한 계정은 복구 할 수 없습니다.")) {
            MemberService.deleteMember(this.state.id).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status === 200) {
                    this.props.history.push('/');
                } else {
                    alert("회원탈퇴에 실패했습니다.");
                }
            });
        }
    }
    changePassword = () => {
        let checkPassword = prompt("현재 비밀번호 입력")
        if (checkPassword == this.state.password) {
            this.changedPassword = prompt("새 비밀번호 입력")
            console.log(this.changedPassword)
            MemberService.updateMember(this.changedPassword, this.state.id).then((res) => {
                console.log("changePassword" + this.changedPassword)
                window.alert("비밀번호가 변경되었습니다.")
            })
        }
        else {
            window.alert("비밀번호가 다릅니다.")
        }
    }
    render() {
        return (
            <div>
                <div className="text-center">
                    <h2>My Page</h2>
                    <br />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 text-center" >
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">
                                        내 정보
                                        </h4>
                                    <p className="text">ID {this.state.id}</p>

                                    <button className="main-btn" onClick={this.gotoHome}>로그아웃</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">계정</h4>
                                    <p className="text" onClick={this.changePassword}>비밀번호 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">커뮤니티
                                    </h4>
                                    <p className="text" onClick={this.communityRules}>커뮤니티 이용규칙</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">이용안내
                                    </h4>

                                    <p className="text">서비스 이용약관</p>
                                    <p className="text">개인정보 처리방침</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">기타
                                    </h4>
                                    <p className="text">정보동의 설정</p>
                                    <p className="text" onClick={this.deleteMember}>회원 탈퇴</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="single-features text-center mt-30" style={{ height: "200px" }}>
                                <div className="department-content text-center">
                                    <h4 className="action-title">개발자 정보
                                        </h4>
                                    <p className="text" onClick={this.handleDeveloperModal}>개발자</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default MyPageComponent;