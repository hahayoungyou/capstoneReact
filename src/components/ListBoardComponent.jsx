import React, { Component } from 'react';
import BoardService from '../service/BoardService';


class ListBoardComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            kins:[]
        }
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount(){
        BoardService.getBoards().then((res)=>{
            this.setState({kins:res.data});
        })
    }

    createBoard(){
        this.props.history.push('/create-board/');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>

                <div className="row">
                    <button className="btn btn-primary" onClick={this.createBoard}>글 작성</button> 
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.kins.map(
                                    kin=>
                                    <tr key ={kin.num}>
                                        <td>{kin.num}</td>
                                        <td>{kin.title}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;