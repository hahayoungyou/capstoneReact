
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import MapComponent from './components/MapComponent';
import HomeComponent from './components/HomeComponent';
import SearchPageComponent from './components/SearchPageComponent'
import LoginComponent from './components/LoginComponent';
import MyPageComponent from './components/MyPageComponent';
import ManageComponent from './components/ManageComponent';
import FindIdPwComponent from './components/FindIdPwComponent';
import SignupComponent from './components/SignupComponent';
import AllHotBoardComponent from './components/AllHotBoardComponent';
import CategoryHotBoardComponent from './components/CategoryHotBoardComponent';
import SearchTagComponent from './components/SearchTagComponent';
import PrivateComponent from './components/PrivateComponent';
function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
         <div className="container"  style={{width: "100%"}}>
          <Switch>
          <Route path="/" exact component={LoginComponent} />
            <Route path="/home" exact component={HomeComponent}></Route> {/*나중에 홈 화면 jsx 만들 것 */}
            <Route path="/board" component={HomeComponent}></Route>
            <Route path="/create-board/:num" component={CreateBoardComponent}></Route>{/*생성페이지*/}
            <Route path="/read-board/:num" component={ReadBoardComponent}></Route>{/*상세페이지*/}
            <Route path="/category-board/:category" component={ListBoardComponent}></Route> {/*카테고리별 리스트 보여줌*/}
            <Route path="/category-map/:category" component={MapComponent}></Route>{/*지도 페이지*/}
            <Route path="/search-board/:search" component={SearchPageComponent}></Route>
            <Route path="/mypage" component={MyPageComponent}></Route>
            <Route path="/manage" component={ManageComponent}></Route>
            <Route path="/find" component={FindIdPwComponent}></Route>{/*Id/Pw 찾기 */}
            <Route path="/Signup" component={SignupComponent}></Route> {/*성공페이지 */}
            <Route path="/Allhotboard" component={AllHotBoardComponent}></Route> {/*성공페이지 */}
            <Route path="/Categoryhotboard/:category" component={CategoryHotBoardComponent}></Route> {/*성공페이지 */}
            <Route path="/SearchTagComponent/:tag" component={SearchTagComponent}></Route> {/*성공페이지 */}
            <Route path="/PrivateComponent/:mode" component={PrivateComponent}></Route> {/*성공페이지 */}
          </Switch>
        </div>
      </Router>
     <FooterComponent />
    </div>
  );
}

export default App;
