import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Showdown from './Showdown'
import { Route, BrowserRouter as Router } from 'react-router-dom'


// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/classic/:csvFile" component={App} />
      <Route exact path="/showdown/:csvFile" component={Showdown} />
    </div>
  </Router>

  , document.getElementById('root')
)