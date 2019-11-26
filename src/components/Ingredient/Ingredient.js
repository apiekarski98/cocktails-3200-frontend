import React from 'react';
import './Ingredient.css';
import ListItem from '../ListItem/ListItem';
const { Component } = React;

class Ingredient extends Component {
    state = {
        ingredients: [],
    };

    async getData() {
        try {
            const response = await fetch('http://localhost:8000/api/ingredient');
            const ingredients = await response.json();
            this.setState({ ingredients });
        } catch (err) {
            return <p>There has been an issue loading the ingredients. Please try again</p>;
        }
    }

     componentDidMount() {
        this.getData();
    }

    onClick = async (ingredient_id) => {
        try {
            await fetch('http://localhost:8000/api/ingredient/' + ingredient_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    render() {
        const ingredients = this.state.ingredients;
        return <h1 className="header">
            {ingredients.map(i => <ListItem key={i.ingredient_id} text={i.ingredient_name} onClick={() => this.onClick(i.ingredient_id)}/>)}
        </h1>;
    }
}

export default Ingredient;