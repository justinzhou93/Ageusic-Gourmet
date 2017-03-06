import React from 'react';
import reactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import store from './store';

/* -----------------   IMPORTED COMPONENTS   ------------------ */

import Home from './react/home'
import Root from './react/root';
import Login from './react/login';
import Signup from './react/signup';

/* -----------------  THUNK ACTION CREATORS   ------------------ */

import {GetUserFromServer} from './redux/users';
import {GetArticlesFromServer} from './redux/articles';

/* -----------------     COMPONENT ROUTES     ------------------ */

const Routes = ({fetchInitialData}) => (
  <Router history = {browserHistory}>
    <Route path = "/" component = {Root} onEnter = {fetchInitialData}>
      <IndexRoute component = {Home} />
      <Route path="contact" component = {Home} />
      <Route path="dessert" component = {Home} />
      <Route path="drink" component = {Home} />
      <Route path="food" component = {Home} />
      <Route path="pairs" component = {Home} />
    </Route>
  </Router>
);

/* ---------------    CONTAINER/ONENTER HOOKS     --------------- */

const mapStatetoProps = null;

const mapStateToDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(GetUserFromServer);
    dispatch(GetArticlesFromServer);
  }
});

export default connect(mapStatetoProps, mapStateToDispatch)(Routes);
