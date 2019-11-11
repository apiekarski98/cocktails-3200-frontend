import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Ingredient from './components/Ingredient/Ingredient';
import Glassware from './components/Glassware/Glassware';
import * as serviceWorker from './serviceWorker';

// async function getData() {
//     // const response = await fetch('https://swapi.co/api/people/1/');
//     const response = await fetch('localhost:8000');
//     const myJson = await response.json();
//     ReactDOM.render(<App name={JSON.stringify(myJson)}/>, document.getElementById('root'));
// }
//
// getData();

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/ingredient" component={Ingredient} />
            <Route path="/glassware" component={Glassware} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
