import React from 'react';
import './App.css';
import MainPage from './pages/main';
import MainPage2 from './pages/mainPage'
//import ShopItemPage from './pages/shopItem';
import ShopPage from './pages/shop';
import BlogPage from './pages/blog';
import ManuPage from './pages/manufactures';
import ManuInfo from './pages/manuInfo'
import SignupPage from './pages/signupPage'
import PostPage from './pages/post'
import AccountPage from './pages/account'
import CreateManuPage from './admin/createManu'
import EditManuPage from './admin/editManu'
import AdminPage from './admin/adminPage'
import QuizPage from './pages/quiz/quizPage'
import EmailPage from './pages/email-verification'
import ErrorPage from './pages/error'
import API from './utils/API'
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';


const trackingId = "UA-171248811-1"; // Replace with your Google Analytics tracking ID
const history = createBrowserHistory();
ReactGA.initialize(trackingId);
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});
var access = null
function getUserAccess  () {
  API.get('/user').then(res=>{
    if(res.data !== {}){access = res.data.access}
  })
}

function App() {
  getUserAccess()
  return (
    <Router history={history}>
    <div className="App">
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/blog' component={BlogPage} />
        <Route exact path='/blogContent/:blogId' component={PostPage}/>
        <Route path='/manufactures' component={ManuPage}/>
        <Route exact path='/manufacture-database/:ManuId'component={ManuInfo}/>
        {access?<Route exact path='/account' component={AccountPage}/>:<Route component={ErrorPage}/>}
        <Route path='/signup' component={SignupPage}/>
        <Route path='/fabric-finder' component={QuizPage}/>
        <Route path='/email-verification' component={EmailPage}/>
        <Route path='*' component={ErrorPage}/>
        {access==='admin'?<>
        <Route path='/admin/create-manufacturer' component={CreateManuPage}/>
        <Route path='/admin/edit/:ManuId' component={EditManuPage}/>
        <Route path='/admin' component={AdminPage}/></>:
        <Route path='*' component={ErrorPage}/>}
      </Switch>
    </div>
    </Router>
  );
}

export default withRouter(App);

// <Route path='/shopItem/:itemId' component={ShopItemPage} />