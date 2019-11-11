import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

async function getData() {
    // const response = await fetch('https://swapi.co/api/people/1/');
    const response = await fetch('https://cocktails-3200.herokuapp.com/');
    const myJson = await response.json();
    ReactDOM.render(<App name={JSON.stringify(myJson)}/>, document.getElementById('root'));
}

getData();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
