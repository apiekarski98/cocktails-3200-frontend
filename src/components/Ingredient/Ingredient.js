import React from 'react';
import './Ingredient.css';
import ListItem from '../ListItem/ListItem';

const {Component} = React;
const baseURL = 'http://localhost:8000/api/ingredient/';

class Ingredient extends Component {
    state = {
        ingredients: [],
        ingredient_name: "",
        ingredientDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        ingredient_id_update: '',
        ingredient_name_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const ingredients = await response.json();
            this.setState({ingredients});
        } catch (err) {
            return <p>There has been an issue loading the ingredients. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (ingredient_id) => {
        try {
            await fetch(baseURL + ingredient_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (ingredient_id) => {
        if (ingredient_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                ingredientDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + ingredient_id);
                const json = await response.json();
                const ingredientDetail = json[0];
                this.setState({
                    ingredientDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: ingredient_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddIngredient = async () => {
        const {ingredient_name} = this.state;
        if (ingredient_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ingredient_name
                        }),
                    });
                this.setState({ingredient_name: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateIngredient = async () => {
        const {ingredient_name_update, ingredient_id_update} = this.state;
        if (ingredient_id_update && ingredient_name_update) {
            try {
                await fetch(baseURL + ingredient_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ingredient_name: ingredient_name_update,
                        }),
                    });
                this.setState({
                    ingredient_name_update: "",
                    ingredient_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewIngredient = event => {
        this.setState({ingredient_name: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({ingredient_name_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({ingredient_id_update: event.target.value});
    };

    renderListItem = (ingredient) => {
        const {ingredient_id, ingredient_name} = ingredient;
        return (
            <div key={ingredient_id + 'a'}>
                <ListItem
                    key={ingredient_id + 'b'}
                    text={ingredient_name}
                    onClickDelete={() => this.onClickDelete(ingredient_id)}
                    onClickInfo={() => this.onClickInfo(ingredient_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === ingredient_id ?
                    <p key={ingredient_id + 'c'} className="id-label">Ingredient
                        ID: {this.state.ingredientDetail.ingredient_id}</p> : null}
            </div>
        );
    };

    render() {
        const ingredients = this.state.ingredients;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Ingredients</h1>
                {ingredients.map(ingredient => this.renderListItem(ingredient))}
            </div>
            <div className="right-container">
                <div className="edit-container">
                    <p>Add new ingredient: </p>
                    <input
                        className="text-input"
                        type="text"
                        name="ingredient"
                        placeholder="Name"
                        value={this.state.ingredient_name}
                        onChange={this.handleNewIngredient}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddIngredient()}>Add ingredient</button>
                </div>
                <p>Update ingredient name: </p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="ingredient_id"
                        placeholder="ID"
                        value={this.state.ingredient_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="ingredient_name"
                        placeholder="Name"
                        value={this.state.ingredient_name_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateIngredient()}>Update ingredient name</button>
                </div>
            </div>
        </div>;
    }
}

export default Ingredient;