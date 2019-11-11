import React from 'react';
import './Ingredient.css';
const { Component } = React;

class Ingredient extends Component {
    state = {
        ingredients: [],
    };

    async getData() {
        const response = await fetch('http://localhost:8000/api/ingredient');
        const ingredients = await response.json();
        console.log(ingredients);
        this.setState({ ingredients});
    }

     componentDidMount() {
        this.getData();
    }

    render() {
        return <h1 className="header">{JSON.stringify(this.state.ingredients)}</h1>;
    }
}

export default Ingredient;