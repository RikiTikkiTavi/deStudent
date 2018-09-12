import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Route } from 'react-router';
import store from './store';

import Main from './components/Mainpage';
import Services from './components/ServiceList';
import ServiceFull from './components/ServiceFull/index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery/dist/jquery.min'

import './styles/index.css';
import './styles/print.css';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';

// import registerServiceWorker from './registerServiceWorker';

class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Fragment>
              <Route exact={true} path="/services" component={Services} />
              <Route
                exact={true}
                path="/services/:id"
                component={ServiceFull}
              />
              <Route
                exact={true}
                path="/services/:id/:step"
                component={ServiceFull}
              />
              <Route exact={true} path="/" component={Main} />
            </Fragment>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
