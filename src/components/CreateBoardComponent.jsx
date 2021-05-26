import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import Axios from 'axios';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {

            num: this.props.match.params.num,
            title: null,
            question: null,
            board_date: Date.now(),
            board_like: '0',
            category: '자유게시판',
            id: ' ',
            tag1: null,
            tag2: null,
            tag3: null,
            tag4: null,
            tag5: null,
            filepath: null
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeQuestionHandler = this.changeQuestionHandler.bind(this);
        this.changeBoard_dateHandler = this.changeBoard_dateHandler.bind(this);
        this.changeBoard_likeHandler = this.changeBoard_likeHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeidHandler = this.changeidHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.changetag1Handler = this.changetag1Handler.bind(this);
        this.changetag2Handler = this.changetag2Handler.bind(this);
        this.changetag3Handler = this.changetag3Handler.bind(this);
        this.changetag4Handler = this.changetag4Handler.bind(this);
        this.changetag5Handler = this.changetag5Handler.bind(this);
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }
    changeQuestionHandler = (event) => {
        this.setState({ question: event.target.value });
    }
    changeBoard_dateHandler = () => {
        this.setState({ board_date: Date.now() });
    }
    changeBoard_likeHandler = (event) => {
        this.setState({ board_like: event.target.value });
    }
    changeidHandler = (event) => {
        this.setState({ id: this.state.id });
    }
    changeCategoryHandler = (event) => {
        this.setState({ category: event.target.value });
    }
    changetag1Handler = (event) => {
        this.setState({ tag1: event.target.value });
    }
    changetag2Handler = (event) => {
        this.setState({ tag2: event.target.value });
    }
    changetag3Handler = (event) => {
        this.setState({ tag3: event.target.value });
    }
    changetag4Handler = (event) => {
        this.setState({ tag4: event.target.value });
    }
    changetag5Handler = (event) => {
        this.setState({ tag5: event.target.value });
    }

    handleFileInput(e) {
        console.log("selected path:" + e.target.files[0].name)
        this.setState({
            filepath: e.target.files[0].name

        })
    }

    createBoard = (event) => {
        event.preventDefault();

        let board = {
            title: this.state.title,
            question: this.state.question,
            board_date: this.state.board_date,
            board_like: this.state.board_like,
            category: this.state.category,
            id: this.state.id,
            tag1: this.state.tag1,
            tag2: this.state.tag2,
            tag3: this.state.tag3,
            tag4: this.state.tag4,
            tag5: this.state.tag5,
            filepath: this.state.filepath
        };
        if (board.title != null && board.question != null) {
            if (this.state.num === '_create') {
                BoardService.createBoard(board).then(res => {
                    if (this.state.category != "건의사항") {
                        this.props.history.push(`/category-board/${this.state.category}`);
                    }

                    else {
                        window.alert("소중한 의견 감사합니다.")
                        this.props.history.push('/home');
                    }

                });
            } else {
                BoardService.updateBoard(this.state.num, board).then(res => {
                    if (this.state.category != "건의사항")
                        this.props.history.push(`/category-board/${this.state.category}`);
                    else
                        this.props.history.push('/home');
                });

            }
        } else {
            if (board.title == null)
                window.alert("제목을 작성해주세요")
            else
                window.alert("질문을 작성해주세요")
        }


    }



    cancel() {
        this.props.history.push('/board');
    }
    getTitle() {
        if (this.state.num === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">글을 수정 합니다.</h3>
        }
    }


    componentDidMount() {
        BoardService.getUserName().then((res) => {
            console.log("id is " + res.data)
            this.setState({
                id: res.data

            });
        });
        if (this.state.num === '_create') {
            return
        } else {

            BoardService.getOneBoard(this.state.num).then((res) => {
                let board = res.data;

                console.log("board => " + JSON.stringify(board));

                this.setState({

                    title: board.title,
                    question: board.question,
                    board_date: board.board_date,
                    board_like: board.board_like,
                    category: board.category,
                    id: board.id,
                    tag1: board.tag1,
                    tag2: board.tag2,
                    tag3: board.tag3,
                    tag4: board.tag4,
                    tag5: board.tag5,
                    filepath: board.filepath
                });
            });
        }
    }

    returnTag() {

        if (this.state.category != '홍보게시판' && this.state.category != '건의사항' && this.state.category != '공지사항') return (

            <div className="form-group">
                <label> tag</label>
                <br></br>
                <table>
                    <tbody>
                        <td>
                            #<input aria-multiline placeholder="tag1추가" name="tag1" className="form-control"
                                value={this.state.tag1} onChange={this.changetag1Handler} />
                        </td>
                        <td>
                            #<input aria-multiline placeholder="tag2추가" name="tag2" className="form-control"
                                value={this.state.tag2} onChange={this.changetag2Handler} />
                        </td>
                        <td>
                            #<input aria-multiline placeholder="tag3추가" name="tag3" className="form-control"
                                value={this.state.tag3} onChange={this.changetag3Handler} />
                        </td>
                        <td>
                            #<input aria-multiline placeholder="tag4추가" name="tag4" className="form-control"
                                value={this.state.tag4} onChange={this.changetag4Handler} />
                        </td>
                        <td>
                            #<input aria-multiline placeholder="tag5추가" name="tag5" className="form-control"
                                value={this.state.tag5} onChange={this.changetag5Handler} />
                        </td>
                    </tbody>
                </table>
            </div>)
        else
            return (<div> </div>)

    }

    returnAll() {
        console.log(this.state.id)
        if (this.state.id === "admin") {
            return (<option value="공지사항">공지사항</option>);
        } else {
            return (<a></a>);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-xl-8 offset-md-2 offset-md-2">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>

                                    <div className="form-group" style={{ float: "left", marginRight: "10px", width: "30%" }}>

                                        <label> Category </label>
                                        <select placeholder="category" name="category" className="form-control"
                                            value={this.state.category} onChange={this.changeCategoryHandler}>
                                            <option value="게시판">게시판 타입을 선택해주세요</option>
                                            <option value="자유게시판">자유게시판</option>
                                            <option value="정형외과">정형외과</option>
                                            <option value="성형외과">성형외과</option>
                                            <option value="내과">내과</option>
                                            <option value="소아과">소아과</option>
                                            <option value="신경외과">신경외과</option>
                                            <option value="한방과">한방과</option>
                                            <option value="치과">치과</option>
                                            <option value="비뇨기과">비뇨기과</option>
                                            <option value="피부과">피부과</option>
                                            <option value="이비인후과">이비인후과</option>
                                            <option value="홍보게시판">홍보게시판</option>
                                            <option value="건의사항">건의사항</option>
                                            {this.returnAll()}

                                        </select>
                                    </div>
                                    <div className="form-group" style={{ float: "right", marginLeft: "10px", width: "65%" }}>
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" cols="60" rows="8"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>

                                    {/* 파일 추가 */}

                                    <div id="inputFile">
                                        <input type="file" name="file" accept="image/png, image/jpeg, image/jpg" onChange={e => this.handleFileInput(e)} />  {/* image 1개 전송 */}
                                    </div>

                                    <div className="form-group" style={{ clear: "both" }}>
                                        <label> Question  </label>
                                        <textarea style={{ height: "200px" }} placeholder="question" name="question" className="form-control"
                                            value={this.state.question} onChange={this.changeQuestionHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> id {this.state.id}</label>

                                    </div>

                                    {this.returnTag()}


                                    <button className="main-btn" onClick={this.createBoard} >저장</button>
                                    <button className="main-btn-cancle" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>취소</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBoardComponent;