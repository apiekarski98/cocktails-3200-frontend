import React from 'react';
import './Ingredient.css';
import ListItem from '../ListItem/ListItem';
const { Component } = React;

class Ingredient extends Component {
    state = {
        ingredients: [],
        ingredient_name: "",
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

    onClickAddIngredient = async () => {
        if (this.state.ingredient_name !== null) {
            try {
                await fetch('http://localhost:8000/api/ingredient',
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ingredient_name: this.state.ingredient_name,
                        }),
                    });
                this.setState({ ingredient_name: "" });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewIngredient = event => {
        this.setState({ ingredient_name: event.target.value });
    };

    render() {
        const ingredients = this.state.ingredients;
        return <h1 className="header">
            <p>Ingredients</p>
            {ingredients.map(i => <ListItem key={i.ingredient_id} text={i.ingredient_name} onClick={() => this.onClick(i.ingredient_id)}/>)}
            <p>Ingredient name: </p>
            <input
                type="text"
                name="ingredient"
                value={this.state.ingredient_name}
                onChange={this.handleNewIngredient}/>
            <button onClick={() => this.onClickAddIngredient()}>Add ingredient</button>
        </h1>;
    }
}

export default Ingredient;