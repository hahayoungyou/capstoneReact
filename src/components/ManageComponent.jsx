import React, { Component, useState } from 'react';
import { Button } from '@material-ui/core';
import BoardService from '../service/BoardService';
import { useTheme } from "@material-ui/styles";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import { BarChart, Bar, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const dataPieBoard = [
  { name: '자유게시판', value: 18 },
  { name: '정형외과', value: 104 },
  { name: '신경외과', value: 98 },
  { name: '비뇨기과', value: 56 },
  { name: '성형외과', value: 147 },
  { name: '한방과', value: 1 },
  { name: '피부과', value: 1 },
  { name: '내과', value: 1 },
  { name: '치과', value: 1 },
  { name: '이비인후과', value: 1 },
  { name: '소아과', value: 1 },
  { name: '안과', value: 1 }
]
const COLORS = ['#e7edf7', '#d4e4f2', '#bad1e6', '#fbb9ab', '#f7e9e4', '#f3f0f2',];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {name}
    </text>
  );
};

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      p_num: 1,
      Boards: [],
      countBoards: '',
      countComment: '',
      dataPie: [],
      dataPieBoard: [],
      countCategory: '',
      paging: {},
      boards: [],
      search: "",
      hots: [],
      tags: "",
      category: "건의사항"
    }
  }
  readBoard(num) {
    this.props.history.push(`/read-board/${num}`);
  }
  componentDidMount() {
    BoardService.getAllBoards().then((res) => {

      this.setState({
        Boards: res.data,
        countBoards: res.data.length,
      });
    });
    BoardService.getAllComments().then((res) => {
      this.setState({
        countComment: res.data.length
      });
    });
    BoardService.getUserName().then((res) => {
      console.log("id is " + res.data)
      this.setState({
        id: res.data
      });
      BoardService.getBoards(this.state.category, this.state.p_num).then((res) => {
        this.setState({
          p_num: res.data.pagingData.currentPageNum,
          category: this.state.category,
          paging: res.data.pagingData,
          boards: res.data.list

        });
      })
    });
    this.setState({
      dataPie: [
        { name: 'Doctor', value: 1 },
        { name: 'User', value: 4 }
      ],
      dataPieBoard: [
        { name: '자유게시판', value: this.state.countCategory },
        { name: '정형외과', value: 104 },
        { name: '신경외과', value: 98 },
        { name: '비뇨기과', value: 56 },
        { name: '성형외과', value: 147 },
        { name: '한방과', value: 102 },
        { name: '피부과', value: 130 },
        { name: '내과', value: 111 },
        { name: '치과', value: 80 },
        { name: '이비인후과', value: 98 },
        { name: '소아과', value: 102 },
        { name: '안과', value: 104 }
      ]
    })
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
  render() {
    return (
      <body >
        <div class="container-fluid" >

          <div>
            <LineChart
              width={900}
              height={300}

              data={[{
                name: '11월', comment: 100, board: 400, amt: 2400, member: 10,
              },
              {
                name: '12월', comment: 150, board: 138, amt: 2210, member: 30,
              },
              {
                name: '1월', comment: 200, board: 800, amt: 2290, member: 50,
              },
              {
                name: '2월', comment: 80, board: 308, amt: 2000, member: 100,
              },
              {
                name: '3월', comment: 100, board: 800, amt: 2181, member: 200,
              },
              {
                name: '4월', comment: 90, board: 300, amt: 2500, member: 100,
              },
              {
                name: '5월', comment: 50, board: 400, amt: 2100, member: 500,
              },
              {
                name: 'total', comment: this.state.countComment, board: this.state.countBoards, amt: 2000, member: 5,
              }]}
              margin={{
                top: 5, right: 30, left: 20, bottom: 10,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1500]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="board" stroke="#8884d8" />
              <Line type="monotone" dataKey="comment" stroke="#82ca9d" />
              <Line type="monotone" dataKey="member" stroke="#bad1e6" />
            </LineChart>
          </div>

          <div style={{ width: '100%', height: 400 }}>

            <ResponsiveContainer>
              <PieChart>

                <Pie dataKey="value" cx={200} cy={200} data={this.state.dataPie} fill="#8884d8" label={renderCustomizedLabel} labelLine={false}>
                  {
                    this.state.dataPie.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Pie dataKey="value" cx={700} cy={200} data={this.state.dataPieBoard} label={renderCustomizedLabel} labelLine={false}>
                  {
                    this.state.dataPieBoard.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          {/* 글작성, 게시물 div*/}
          <div class="container-fluid" >
            <h1>건의사항</h1> <br></br>
              <div class="row">
              <div >
                {
                  this.state.boards.map(
                    board =>
                      <div >
                        <div key={board.board_no} style={{ border: "1px solid", padding: "5px" }}>
                          <div><a onClick={() => this.readBoard(board.board_no)}><h5>{board.title}</h5></a><br />
                          </div>
                          <div style={{ display: "inline-block", width: "800px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                            {board.question}
                          </div>
                          <div style={{ left: "5%", display: "inline" }}>
                            {this.returnDate(board.board_date)}
                            &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
                            {board.id}
                          </div>
                        </div>
                      </div>
                  )
                }

                <br></br>
                <br></br>
              </div>{/* 글작성, 게시물 div*/}
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
      </body >
    );
  }
}

export default HomeComponent;


