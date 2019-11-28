import React from 'react';
import './Garnish.css';
import ListItem from "../ListItem/ListItem";
const { Component } = React;

const baseURL = 'http://localhost:8000/api/garnish/';

class Garnish extends Component {
    state = {
        garnish: [],
        garnish_name: "",
        garnishDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        garnish_id_update: '',
        garnish_name_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const garnishes = await response.json();
            this.setState({garnishes});
        } catch (err) {
            return <p>There has been an issue loading the garnishes. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (garnish_id) => {
        try {
            await fetch(baseURL + garnish_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (garnish_id) => {
        if (garnish_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                garnishDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + garnish_id);
                const json = await response.json();
                const garnishDetail = json[0];
                this.setState({
                    garnishDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: garnish_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddGarnish = async () => {
        const {garnish_name} = this.state;
        if (garnish_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            garnish_name
                        }),
                    });
                this.setState({garnish_name: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateGarnish = async () => {
        const {garnish_name_update, garnish_id_update} = this.state;
        if (garnish_id_update && garnish_name_update) {
            try {
                await fetch(baseURL + garnish_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            garnish_name: garnish_name_update,
                        }),
                    });
                this.setState({
                    garnish_name_update: "",
                    garnish_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewGarnish = event => {
        this.setState({garnish_name: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({garnish_name_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({garnish_id_update: event.target.value});
    };

    renderListItem = (garnish) => {
        const {garnish_id, garnish_name} = garnish;
        return (
            <div key={garnish_id + 'a'}>
                <ListItem
                    key={garnish_id + 'b'}
                    text={garnish_name}
                    onClickDelete={() => this.onClickDelete(garnish_id)}
                    onClickInfo={() => this.onClickInfo(garnish_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === garnish_id ?
                    <p key={garnish_id + 'c'} className="id-label">Garnish
                        ID: {this.state.garnishDetail.garnish_id}</p> : null}
            </div>
        );
    };

    render() {
        const { garnishes } = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Garnishes</h1>
                {garnishes && garnishes.map(garnish => this.renderListItem(garnish))}
            </div>
            <div className="right-container">
                <p>Add new garnish:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="garnish"
                        placeholder="Name"
                        value={this.state.garnish_name}
                        onChange={this.handleNewGarnish}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddGarnish()}>
                        Add garnish
                    </button>
                </div>
                <p>Update garnish name:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="garnish_id"
                        placeholder="ID"
                        value={this.state.garnish_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="garnish_name"
                        placeholder="Name"
                        value={this.state.garnish_name_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateGarnish()}>
                        Update garnish name
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Garnish;