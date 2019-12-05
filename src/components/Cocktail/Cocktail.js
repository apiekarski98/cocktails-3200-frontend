import React from 'react';
import './Cocktail.css';
import ListItem from "../ListItem/ListItem";

const {Component} = React;

const baseURL = 'http://localhost:8000/api/cocktail/';

class Cocktail extends Component {
    state = {
        cocktails: [],
        cocktail_name: "",
        cocktailDetail: {},
        cocktailIngredients: [],
        cocktailGarnishes: [],
        cocktailSteps: [],
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        cocktail_id_update: '',
        cocktail_name_update: '',
        c_id_update: '',
        bartender_id_update: '',
        glassware_id_update: '',
        ingredient_id_update: '',
        ingredient_amount_update: '',
        garnish_id_update: '',
        garnish_amount_update: '',
        step_id_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const cocktails = await response.json();
            this.setState({cocktails});
        } catch (err) {
            return <p>There has been an issue loading the cocktails. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (cocktail_id) => {
        try {
            await fetch(baseURL + cocktail_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (cocktail_id) => {
        if (cocktail_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                cocktailDetail: {},
                cocktailIngredients: [],
                cocktailGarnishes: [],
                cocktailSteps: [],
            });
        } else {
            try {
                const response = await fetch(baseURL + cocktail_id);
                const json = await response.json();
                const cocktailDetail = json[0];

                const ingredient_response = await fetch(baseURL + cocktail_id + '/ingredient');
                const cocktailIngredients = await ingredient_response.json();

                const garnish_response = await fetch(baseURL + cocktail_id + '/garnish');
                const cocktailGarnishes = await garnish_response.json();

                const preparation_response = await fetch(baseURL + cocktail_id + '/preparation');
                const cocktailSteps = await preparation_response.json();

                this.setState({
                    cocktailDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: cocktail_id,
                    cocktailIngredients,
                    cocktailGarnishes,
                    cocktailSteps,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddCocktail = async () => {
        const {cocktail_name} = this.state;
        if (cocktail_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cocktail_name
                        }),
                    });
                this.setState(
                    {
                        cocktail_name: "",
                    });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateCocktail = async () => {
        const {cocktail_id_update, cocktail_name_update} = this.state;
        if (cocktail_id_update && cocktail_name_update) {
            try {
                await fetch(baseURL + cocktail_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cocktail_name: cocktail_name_update
                        }),
                    });
                this.setState({
                    cocktail_id_update: "",
                    cocktail_name_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddBartender = async () => {
        const {c_id_update, bartender_id_update} = this.state;
        if (c_id_update && bartender_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/add-bartender/' + bartender_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                    bartender_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickRemoveBartender = async () => {
        const {c_id_update} = this.state;
        if (c_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/remove-bartender',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddGlassware = async () => {
        const {c_id_update, glassware_id_update} = this.state;
        if (c_id_update && glassware_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/add-glassware/' + glassware_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                    glassware_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickRemoveGlassware = async () => {
        const {c_id_update} = this.state;
        if (c_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/remove-glassware',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddIngredient = async () => {
        const {c_id_update, ingredient_id_update, ingredient_amount_update} = this.state;
        if (c_id_update && ingredient_id_update && ingredient_amount_update) {
            try {
                await fetch(baseURL + c_id_update + '/add-ingredient/' + ingredient_id_update,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ingredient_amount: ingredient_amount_update,
                        }),
                    });
                this.setState({
                    c_id_update: "",
                    ingredient_id_update: "",
                    ingredient_amount_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickRemoveIngredient = async () => {
        const {c_id_update, ingredient_id_update} = this.state;
        if (c_id_update && ingredient_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/remove-ingredient/' + ingredient_id_update,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                    ingredient_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddGarnish = async () => {
        const {c_id_update, garnish_id_update, garnish_amount_update} = this.state;
        if (c_id_update && garnish_id_update && garnish_amount_update) {
            try {
                await fetch(baseURL + c_id_update + '/add-garnish/' + garnish_id_update,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            garnish_amount: garnish_amount_update,
                        }),
                    });
                this.setState({
                    c_id_update: "",
                    garnish_id_update: "",
                    garnish_amount_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickRemoveGarnish = async () => {
        const {c_id_update, garnish_id_update} = this.state;
        if (c_id_update && garnish_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/remove-garnish/' + garnish_id_update,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                    garnish_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddStep = async () => {
        const {c_id_update, step_id_update} = this.state;
        if (c_id_update && step_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/add-step/' + step_id_update,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                this.setState({
                    c_id_update: "",
                    step_id_update: ""
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickRemoveStep = async () => {
        const {c_id_update, step_id_update} = this.state;
        if (c_id_update && step_id_update) {
            try {
                await fetch(baseURL + c_id_update + '/remove-step/' + step_id_update,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                this.setState({
                    c_id_update: "",
                    step_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewCocktail = event => {
        this.setState({cocktail_name: event.target.value});
    };

    handleIdUpdate = event => {
        this.setState({cocktail_id_update: event.target.value});
    };

    handleNameUpdate = event => {
        this.setState({cocktail_name_update: event.target.value});
    };

    handleCocktailUpdate = event => {
        this.setState({c_id_update: event.target.value});
    };

    handleBartenderUpdate = event => {
        this.setState({bartender_id_update: event.target.value});
    };

    handleGlasswareUpdate = event => {
        this.setState({glassware_id_update: event.target.value});
    };

    handleIngredientUpdate = event => {
        this.setState({ingredient_id_update: event.target.value});
    };

    handleIngredientAmountUpdate = event => {
        this.setState({ingredient_amount_update: event.target.value});
    };

    handleGarnishUpdate = event => {
        this.setState({garnish_id_update: event.target.value});
    };

    handleGarnishAmountUpdate = event => {
        this.setState({garnish_amount_update: event.target.value});
    };

    handleStepUpdate = event => {
        this.setState({step_id_update: event.target.value});
    };

    renderListItem = (cocktail) => {
        const {cocktail_id, cocktail_name} = cocktail;
        const {bartender, glassware} = this.state.cocktailDetail;
        const {cocktailIngredients, cocktailGarnishes, cocktailSteps} = this.state;
        return (
            <div key={cocktail_id + 'a'}>
                <ListItem
                    key={cocktail_id + 'b'}
                    text={cocktail_name}
                    onClickDelete={() => this.onClickDelete(cocktail_id)}
                    onClickInfo={() => this.onClickInfo(cocktail_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === cocktail_id ?
                    <div key={cocktail_id + 'c'}>
                        <p className="id-label">
                            Cocktail ID: {this.state.cocktailDetail.cocktail_id}
                        </p>
                        <p className="id-label">Bartender: {bartender === null ? "Unknown" : bartender}</p>
                        <p className="id-label">Glassware: {glassware === null ? "Unknown" : glassware}</p>
                        <div>
                            <p className="id-label">Ingredients:</p>
                            <ul>{cocktailIngredients.length === 0 ? "None" : cocktailIngredients.map(i =>
                                <li>{i.amount} {i.ingredient_name}</li>)}
                            </ul>
                            <p className="id-label">Garnishes:</p>
                            <ul>{cocktailGarnishes.length === 0 ? "None" : cocktailGarnishes.map(g =>
                                <li>{g.amount} {g.garnish_name}</li>)}
                            </ul>
                            <p className="id-label">Preparation:</p>
                            <ul>{cocktailSteps.length === 0 ? "None" : cocktailSteps.map(s =>
                                <li>{s.step}</li>)}
                            </ul>
                        </div>
                    </div> : null}
            </div>
        );
    };

    render() {
        const {cocktails} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Cocktails</h1>
                {cocktails && cocktails.map(cocktail => this.renderListItem(cocktail))}
            </div>
            <div className="right-container">
                <p>Add new cocktail:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="Name"
                        placeholder="Cocktail"
                        value={this.state.cocktail_name}
                        onChange={this.handleNewCocktail}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddCocktail()}>
                        Add cocktail
                    </button>
                </div>
                <p>Update cocktail name:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="cocktail_id"
                        placeholder="Cocktail ID"
                        value={this.state.cocktail_id_update}
                        onChange={this.handleIdUpdate}/>
                    <input
                        className="text-input"
                        type="text"
                        name="cocktail_name"
                        placeholder="Name"
                        value={this.state.cocktail_name_update}
                        onChange={this.handleNameUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateCocktail()}>
                        Update cocktail
                    </button>
                </div>
                <p>Update cocktail <br/>(other fields):</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="cocktail_id_update"
                        placeholder="Cocktail ID"
                        value={this.state.c_id_update}
                        onChange={this.handleCocktailUpdate}/>
                </div>
                <p>Add/Remove bartender:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="bartender_id"
                        placeholder="Bartender ID"
                        value={this.state.bartender_id_update}
                        onChange={this.handleBartenderUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddBartender()}>
                        Add bartender
                    </button>
                    <button
                        className="delete"
                        onClick={() => this.onClickRemoveBartender()}>
                        Remove bartender
                    </button>
                </div>
                <p>Add/Remove glassware:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="glassware_id"
                        placeholder="Glassware ID"
                        value={this.state.glassware_id_update}
                        onChange={this.handleGlasswareUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddGlassware()}>
                        Add glassware
                    </button>
                    <button
                        className="delete"
                        onClick={() => this.onClickRemoveGlassware()}>
                        Remove glassware
                    </button>
                </div>
                <p>Add/Remove ingredient:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="ingredient_amount"
                        placeholder="Amount"
                        value={this.state.ingredient_amount_update}
                        onChange={this.handleIngredientAmountUpdate}/>
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="ingredient_id"
                        placeholder="Ingredient ID"
                        value={this.state.ingredient_id_update}
                        onChange={this.handleIngredientUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddIngredient()}>
                        Add ingredient
                    </button>
                    <button
                        className="delete"
                        onClick={() => this.onClickRemoveIngredient()}>
                        Remove ingredient
                    </button>
                </div>
                <p>Add/Remove garnish:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="garnish_amount"
                        placeholder="Amount"
                        value={this.state.garnish_amount_update}
                        onChange={this.handleGarnishAmountUpdate}/>
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="garnish_id"
                        placeholder="Garnish ID"
                        value={this.state.garnish_id_update}
                        onChange={this.handleGarnishUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddGarnish()}>
                        Add garnish
                    </button>
                    <button
                        className="delete"
                        onClick={() => this.onClickRemoveGarnish()}>
                        Remove garnish
                    </button>
                </div>
                <p>Add/Remove step:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="step_id"
                        placeholder="Step ID"
                        value={this.state.step_id_update}
                        onChange={this.handleStepUpdate}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddStep()}>
                        Add step
                    </button>
                    <button
                        className="delete"
                        onClick={() => this.onClickRemoveStep()}>
                        Remove step
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Cocktail;