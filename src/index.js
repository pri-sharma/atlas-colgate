import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import View from './View';
import ApiUrl_del from './ApiUrl_del';
import * as serviceWorker from './serviceWorker';

// const routing = (
//     <Router>
//       <div>
//         <Route path="/App" component={App} />
//         <Route path="/View" component={View} />
//         {/* <Route path="/contact" component={Contact} /> */}
//       </div>
//     </Router>
//   )

 ReactDOM.render(<View/>, document.getElementById('root'));
 //ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
