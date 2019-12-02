import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Bar from './components/Bar/Bar';
import Bartender from './components/Bartender/Bartender';
import Cocktail from './components/Cocktail/Cocktail';
import Garnish from './components/Garnish/Garnish';
import Glassware from './components/Glassware/Glassware';
import Ingredient from './components/Ingredient/Ingredient';
import Location from "./components/Location/Location";
import Preparation from "./components/Preparation/Preparation";
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/bar" component={Bar} />
            <Route path="/bartender" component={Bartender} />
            <Route path="/cocktail" component={Cocktail} />
            <Route path="/garnish" component={Garnish} />
            <Route path="/glassware" component={Glassware} />
            <Route path="/ingredient" component={Ingredient} />
            <Route path="/location" component={Location} />
            <Route path="/preparation" component={Preparation} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
