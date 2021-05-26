import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import heart from '../assets/images/heart.png';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            p_num: 1,
            category: props.match.params.category,
            paging: {},
            boards: [],
            search: "",
            hots: [],
            tags:""
        }
        this.createBoard = this.createBoard.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getHotBoard();
        this.getPopularTag();
    }

    componentDidMount() {
        BoardService.getBoards(this.state.category, this.state.p_num).then((res) => {
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                category: this.state.category,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        })
    }
    createBoard() {
        this.props.history.push('/create-board/_create');
    }
    readBoard(num) {
        this.props.history.push(`/read-board/${num}`);
    }
    mapBoard(category) {
        this.props.history.push(`/category-map/${category}`);
    }
    listBoard(category, p_num) {
        console.log("pageNum : " + p_num);
        BoardService.getBoards(category, p_num).then((res) => {
            console.log(res.data);
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                category: this.state.category,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }
    returnDate(board_date) {
        const dateString = board_date + ""
        let y = dateString.split("T"); //날짜 , 시간.00:00:00
        let yymmdd = y[0];
        let t = y[1] + "";
        let tt = t.split(".");
        let hhmmss = tt[0];
        return (
            <div style={{ display: 'inline' }}>
                 {yymmdd}, {hhmmss} 
                </div>
        )
    }
    viewPaging() {
        const pageNums = [];
        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }
        let currentpage = this.state.paging.currentPageNum;
        return (pageNums.map((page) =>
            <li className="page-item" key={page.toString()}>
                <a className="page-link" onClick={() => this.listBoard(this.state.category, page)}>
                    {
                        (function () {
                            if (page == currentpage)
                                return (<div style={{ color: '#fbb9ab', fontWeight: 'bold' }}>{page}</div>);
                            else return (<div>{page}</div>);
                        })()
                    }
                </a>
            </li>
        ));
    }
    isPagingPrev() {
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(this.state.category, this.state.paging.currentPageNum - 1)} tabIndex="-1">Previous</a>
                </li>
            );
        }
    }
    isPagingNext() {
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(this.state.category, this.state.paging.currentPageNum + 1)} tabIndex="-1">Next</a>
                </li>
            );
        }
    }
    isMoveToFirstPage() {
        if (this.state.p_num !== 0) {//1
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(this.state.category, 1)} tabIndex="-1">Page1</a>
                </li>
            );
        }
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
    mapPage() {
        if (this.state.category != "자유게시판" && this.state.category != "홍보게시판" &&this.state.category !="건의사항" &&this.state.category != "공지사항") {
            return (
                <h2 style={{ fontWeight: 'bold', display: "inline" }}>
                     <a onClick={() => this.mapBoard(this.state.category)}>🗺 지도 </a>
                </h2>
            )
        }
    }
    getHotBoard() {
        BoardService.getHotBoard().then((res) => {
            this.setState({
                hots: res.data
            });
        });
    }
    getPopularTag(){
        BoardService. getPopularTag().then((res)=>{
            console.log("this.is"+res.data)
            this.setState({
                tags: res.data            
            });
        });
        this.returnTag()
    }
    searchtag(tag) {
        this.props.history.push(`/SearchTagComponent/${tag}`);
    }
    returnTag() {
        const tag= this.state.tags+""
        console.log("string"+tag)
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

    gotoListBoard(category){
        this.props.history.push(`/Categoryhotboard/${category}`);
    }
    write(){
        if(this.state.category != '공지사항' ){
            if( this.state.category=='홍보게시판'){
                return(
                    <div >
                         <button className="main-btn" onClick={this.createBoard} style={{marginLeft:"670px"}}>글 작성</button>
                    </div>
                );
            }
            else{
                return(
                    <div >
                       <button className="main-btn" onClick={() => this.gotoListBoard(this.state.category)} >Hot</button>
                        <button className="red-btn" >목록</button>
                         <button className="main-btn" onClick={this.createBoard} style={{marginLeft:"450px"}}>글 작성</button>
                    </div>
                );
            }
            
        }
        else {
            return(<div><h3>&nbsp;  &nbsp; &nbsp;📣공지사항 한번씩 확인해주세요~📣</h3></div>);
        }
    }
    showlist(){
        if(this.state.category != '공지사항'&& this.state.category != '자유게시판'&& this.state.category != '홍보게시판'){
            return(<h2 style={{ color: '#FBB9AB', display: "inline", fontWeight: 'bold', textDecorationColor: '#FBB9AB', textDecoration: "underline" }}><a onClick={() => this.listBoard(this.state.category, 1)}><u>📃 게시판</u></a></h2>);
        }
        else{
            return(<a>

            </a>)
        }
   }
   showLikeComment(like,comment){
       if(this.state.category != '공지사항' && this.state.category != '홍보게시판')
        {
            return(
                <div style={{display: "inline",position: "absolute",  right: "5%" }}>
                     <img src={heart} style={{width:"20px", height:"20px", marginBottom:"3px"}}alt='heart' ></img>{like} 🗨️{comment}                                                              
                </div>
            )
        }
   }
   AllHotBoard() {
    this.props.history.push(`/Allhotboard`);
    }
    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center"  >{this.state.category}
                        <br></br>{this.showlist()}&nbsp;&nbsp;
                        {this.mapPage()}
                    </h2>
                </div>
                
                <div class="container-fluid" >
                    {this.write()}
                    <div class="row">
                        <div class="col-lg-9">{/*글 목록*/}
                            <hr style={{ width: "100%", border: "1px solid #bad1e6" }} />
                                {this.state.boards.map(
                                    board =>
                                    <div >                                                       
                                        <div key={board.board_no} style={{ padding: "5px", borderRadius:"10px"}}>
                                                <div><a onClick={() => this.readBoard(board.board_no)}><h5>{board.title}</h5></a><br />
                                                </div>
                                                <div style={{ display: "inline-block", width: "800px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                            {board.question} 
                                                </div> 
                                                <div style={{ left: "5%" ,display: "inline"}}>
                                                    {this.returnDate(board.board_date)}
                                                    &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
                                                    {board.id}
                                                </div>                                                            
                                                {this.showLikeComment(board.board_like,board.commentcount)}            
                                                    <hr style={{ width: "100%", border: "1px solid #bad1e6"}} />
                                            </div>
                                                    
                                        </div>   
                                )}

                        </div>{/* 글 목록*/}
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
                            <div >{/*인기태그,hot*/}
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
                               
                                <div className="single-features text-center mt-30">{/*hot*/}
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
                        <div >                   
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    {
                                        this.isMoveToFirstPage()
                                    }
                                    {
                                        this.isPagingPrev()
                                    }
                                    {
                                        this.viewPaging()
                                    }
                                    {
                                        this.isPagingNext()
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListBoardComponent;