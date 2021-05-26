import React, { Component, useState } from 'react';
import BoardService from '../service/BoardService';
import Slider from "react-slick";
import userIcon3 from '../assets/images/userIcon3.png';
import heart from '../assets/images/heart.png';

class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            p_num: 1,
            boards1: [],
            boards2: [],
            boards3: [],
            boards4: [],
            boards5: [],
            boards6: [],
            boards7: [],
            boards8: [],
            boards9: [],
            boards10: [],
            boards11: [],
            boards12: [],
            search: "",
            hots:[],
            tags:"",
            str01: "",
            id:''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getHotBoard();
        this.getPopularTag();
        this.getRecentBoard1("자유게시판");
        this.getRecentBoard2("정형외과");
        this.getRecentBoard3("신경외과");
        this.getRecentBoard4("비뇨기과");
        this.getRecentBoard5("성형외과");
        this.getRecentBoard6("한방과");
        this.getRecentBoard7("피부과");
        this.getRecentBoard8("내과");
        this.getRecentBoard9("치과");
        this.getRecentBoard10("이비인후과");
        this.getRecentBoard11("소아과");
        this.getRecentBoard12("안과");
        this.searchKeyWord = this.searchKeyWord.bind(this);
 
    }
    componentDidMount() {
        BoardService. getUserName( ).then ((res)=>{
            console.log("id is "+res.data)
            this.setState({
                id: res.data
                
            });
        });
        BoardService. getPopularTag().then((res)=>{
            console.log("this is popularTag"+res.data)
            this.setState({
                tags: res.data
                
            });
        });   
    }

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    }
    searchKeyWord(search) {
        this.props.history.push(`/search-board/${search}`);
    }
    clearbtn = (event) => {
        this.setState({ search: '' });
    }
    GotoCategory(category) {
        this.props.history.push(`/category-board/${category}`);
    }
    GotoAdminpage() {
        if(this.state.id === "admin" )
            this.props.history.push(`/manage`);
    }
    returnDate(board_date) {
        const dateString = board_date + ""
        let y = dateString.split("T"); //날짜 , 시간.00:00:00
        let yymmdd = y[0];
        let t = y[1] + "";
        let tt = t.split(".");
        let hhmmss = tt[0];
        return (
            <p>
                [ {yymmdd}, {hhmmss} ]
            </p>
        )
    }
    readBoard(num) {
        this.props.history.push(`/read-board/${num}`);
    }
    getHotBoard(){
        BoardService.getHotBoard().then((res)=>{
            console.log("this.is. hot"+res.data)
            this.setState({
                hots : res.data
            });            
        });
    }
    
    getRecentBoard1(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards1 : res.data
            });
        });
    }
    getRecentBoard2(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards2 : res.data
            });
        });
    }
    getRecentBoard3(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards3 : res.data
            });
        });
    }
    getRecentBoard4(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards4 : res.data
            });
        });
    }
    getRecentBoard5(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards5 : res.data
            });
        });
    }
    getRecentBoard6(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards6 : res.data
            });
        });
    }
    getRecentBoard7(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards7 : res.data
            });
        });
    }
    getRecentBoard8(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards8 : res.data
            });
        });
    }
    getRecentBoard9(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards9 : res.data
            });
        });
    }
    getRecentBoard10(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards10 : res.data
            });
        });
    }
    getRecentBoard11(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards11 : res.data
            });
        });
    }
    getRecentBoard12(category){
        BoardService.getRecentBoard(category).then((res)=>{
            console.log("recentboard "+res.data)
            this.setState({
                boards12 : res.data
            });
        });
    }
    returnTag = () => {
        const tag= this.state.tags+""
        console.log("string"+ tag)
          let str01 =tag.split(",");
           return (
                <div>
                  <a className="homecategory" onClick={() => this.searchtag(str01[0])} > #{str01[0]} </a><br/> 
                  <a className="homecategory" onClick={() => this.searchtag(str01[2])} >#{str01[2]}</a><br/> 
                  <a className="homecategory" onClick={() => this.searchtag(str01[4])} > #{str01[4]}</a><br/> 
                  <a  className="homecategory" onClick={() => this.searchtag(str01[6])} > #{str01[6]}</a><br/> 
                  <a className="homecategory" onClick={() => this.searchtag(str01[8])} > #{str01[8]}</a><br/> 
               </div>
           )
    }
   getPopularTag(){    
        this.returnTag()
    }
    searchtag(tag) {
        this.props.history.push(`/SearchTagComponent/${tag}`);
    }
    AllHotBoard() {
        this.props.history.push(`/Allhotboard`);
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
            <body>
                <div class="container-fluid" >
                    <div class="row">
                        <div class="col-lg-2">{/*계정,내가쓴글,내가쓴댓글,광고(관리자)*/}
                            <div className="single-features text-center mt-30">{/*계정*/}
                                <div className="department-content text-center">
                                    <a onClick={()=> this.props.history.push('/mypage')}>
                                        <h4 className="department-title">계정</h4>
                                    </a>
                                    <div>
                                        <img src={userIcon3} alt='userIcon' ></img>
                                    </div>
                                    <div >
                                        {this.state.id}
                                        <button className="mybtn" onClick={()=> this.props.history.push('/mypage')} >내 정보</button>
                                        <button className="mybtn" onClick={()=> this.props.history.push('/')} >로그아웃</button>
                                    </div>
                                </div>
                            </div>{/*계정*/}
                            <div className="single-features text-center mt-30">{/*내가 쓴 글*/}
                                <div className="department-content text-center">
                                    <h5 onClick={()=> this.props.history.push('/PrivateComponent/board')}> 내가 쓴 글</h5>
                                </div>
                            </div>
                            <div className="single-features text-center mt-30">{/*내가 쓴 댓글*/}
                                <div className="department-content text-center">
                                    <h5 onClick={()=> this.props.history.push('/PrivateComponent/comment')}>내가 쓴 댓글</h5>
                                </div>
                            </div>
                            <div className="single-features text-center mt-30" style={{padding:'0px'}}>{/*광고(관리자)*/}
                                <div className="department-content text-center">
                                    <h4 style={{padding:'0px'}} className="department-title" a onClick={() => this.GotoAdminpage()}>      
                                        <img className="image" src={require('../../src/image/ad3.png').default} style={{height:"200px"}}/>
                                    </h4>
                                </div>
                            </div>   
                        </div>{/*계정,내가쓴글,내가쓴댓글,광고(관리자)*/}
                        
                        <div class="col-lg-7" style={{ padding:"30px" ,border:"1px solid #bad1e6",textAlign:"center"}}>{/*실시간 글*/}
                            <Slider {...settings}>
                                <div style={{textAlign:"center"}}>{/*1페이지*/}

                                    <h3 onClick={() => this.GotoCategory("자유게시판")} className="mousecursor">자유게시판</h3>
                                    <table className="hometable">
                                        <tbody >
                                            {this.state.boards1.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table>
                                    <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />
                                    <br/>

                                    <h3 onClick={() => this.GotoCategory("정형외과")} className="mousecursor">정형외과</h3>
                                    <table  className="hometable">
                                        <tbody>
                                            {this.state.boards2.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                    )}
                                        </tbody> 
                                    </table>
                                    <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />
                                    <br/>

                                    <h3 onClick={() => this.GotoCategory("신경외과")} className="mousecursor">신경외과</h3>
                                    <table  className="hometable">
                                        <tbody>
                                            {this.state.boards3.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                    )}
                                        </tbody> 
                                    </table> 
                                    <br/>
                                </div>
                           
                            
                                <div>{/*2페이지*/}
                                    <h3 onClick={() => this.GotoCategory("비뇨기과")} className="mousecursor">비뇨기과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards4.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                )}
                                        </tbody> 
                                    </table>
                                    <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />
                                    <br/>

                                    <h3 onClick={() => this.GotoCategory("성형외과")} className="mousecursor">성형외과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards5.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                    )}
                                        </tbody> 
                                    </table> 
                                    <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />
                                    <br/>

                                    <h3 onClick={() => this.GotoCategory("한방과")} className="mousecursor">한방과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards6.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                    )}
                                        </tbody> 
                                    </table> 
                                    <br/>  
                                </div>
                                <div>{/*3페이지*/}
                                    <h3 onClick={() => this.GotoCategory("피부과")} className="mousecursor">피부과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards7.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table> <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} /><br/>

                                    <h3 onClick={() => this.GotoCategory("내과")} className="mousecursor">내과</h3>
                                    <table className="hometable">
                                        <tbody >
                                            {this.state.boards8.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table><br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />  <br/>

                                    <h3 onClick={() => this.GotoCategory("치과")} className="mousecursor">치과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards9.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table> <br/> 
                                </div>
                                <div>{/*4페이지*/}
                                    <h3 onClick={() => this.GotoCategory("이비인후과")} className="mousecursor"> 이비인후과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards10.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table> <br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} /><br/>

                                    <h3 onClick={() => this.GotoCategory("소아과")} className="mousecursor">소아과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards11.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                            )}
                                        </tbody> 
                                    </table><br/>
                                    <hr style={{ width: "100%", border: "1px solid #bad1e6" }} /><br/>

                                    <h3 onClick={() => this.GotoCategory("안과")} className="mousecursor">안과</h3>
                                    <table className="hometable">
                                        <tbody>
                                            {this.state.boards12.map(
                                                board =>
                                                    <tr className="tr">
                                                        <a  onClick={()=>this.readBoard(board.board_no)}>{board.title}</a> 
                                                    </tr>
                                                    )}
                                        </tbody> 
                                    </table>    <br/>
                                </div>
                            </Slider>
                        </div>{/*실시간 글*/}
                        <div class="col-lg-3">{/*검색,인기태그,hot*/}
                            <table>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="검색하기"
                                            name="search" value={this.state.search}
                                            className="form-control" onChange={this.handleSearchChange} />
                                    </td>
                                    <td><button className="btn btn-outline-secondary btn-search" onClick={() => this.searchKeyWord(this.state.search)}>Search</button></td>
                                </tr>
                            </table>
                            <br/>
                            <div >
                                <div className="single-features text-center mt-30">{/*인기태그*/}
                                    <div className="department-content text-center">
                                        <h4 className="department-title">
                                            #인기태그
                                        </h4>
                                        <p className="text">
                                            {this.returnTag()}     
                                        </p>
                                    </div>
                                </div>
                               
                                <div className="single-features text-center mt-30">{/* HOT 게시물 */}
                                    <div className="department-content text-center">  
                                        <h4 className="department-title" onClick={()=>this.AllHotBoard()} >
                                            HOT 게시물                                          
                                        </h4>
                                        <table className="table-board">
                                            <tbody>
                                                {this.state.hots.map(
                                                hot =>
                                                <tr className="tr">
                                                    <a className="hot" onClick={()=>this.readBoard(hot.board_no)}>{hot.title}  <img src={heart} style={{width:"20px", height:"20px", marginBottom:"3px"}}alt='heart' ></img>{hot.board_like} 🗨️ {hot.commentcount}</a>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table> <br/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>{/*검색,인기태그,hot*/}
                    </div>
                    
                </div>
            </body >
        );
    }
}

export default HomeComponent;