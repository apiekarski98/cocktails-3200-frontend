import React from 'react';
import './Bartender.css';
import ListItem from "../ListItem/ListItem";
const { Component } = React;
const baseURL = 'http://localhost:8000/api/bartender/';

class Bartender extends Component {
    state = {
        bartenders: [],
        bartender_name: "",
        bartenderDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        bartender_id_update: '',
        bartender_name_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const bartenders = await response.json();
            this.setState({bartenders});
        } catch (err) {
            return <p>There has been an issue loading the bartenders. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (bartender_id) => {
        try {
            await fetch(baseURL + bartender_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (bartender_id) => {
        if (bartender_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                bartenderDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + bartender_id);
                const json = await response.json();
                const bartenderDetail = json[0];
                this.setState({
                    bartenderDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: bartender_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddBartender = async () => {
        const {bartender_name} = this.state;
        if (bartender_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bartender_name
                        }),
                    });
                this.setState({bartender_name: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateBartender = async () => {
        const {bartender_name_update, bartender_id_update} = this.state;
        if (bartender_id_update && bartender_name_update) {
            try {
                await fetch(baseURL + bartender_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bartender_name: bartender_name_update,
                        }),
                    });
                this.setState({
                    bartender_name_update: "",
                    bartender_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewBartender = event => {
        this.setState({bartender_name: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({bartender_name_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({bartender_id_update: event.target.value});
    };

    renderListItem = (bartender) => {
        const {bartender_id, first_name, last_name} = bartender;
        return (
            <div key={bartender_id + 'a'}>
                <ListItem
                    key={bartender_id + 'b'}
                    text={first_name + ' ' + last_name}
                    onClickDelete={() => this.onClickDelete(bartender_id)}
                    onClickInfo={() => this.onClickInfo(bartender_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === bartender_id ?
                    <p key={bartender_id + 'c'} className="id-label">
                        Bartender ID: {this.state.bartenderDetail.bartender_id}<br/>
                        Bar: {this.state.bartenderDetail.bar_name}<br/>
                        Bar ID: {this.state.bartenderDetail.bar}
                    </p> : null}
            </div>
        );
    };

    render() {
        const {bartenders} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Bartenders</h1>
                {bartenders && bartenders.map(bartender => this.renderListItem(bartender))}
            </div>
            <div className="right-container">
                <p>Add new bartender:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="bartender"
                        placeholder="Name"
                        value={this.state.bartender_name}
                        onChange={this.handleNewBartender}/>
                    <input
                        className="text-input"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.handleNewBartender}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddBartender()}>
                        Add bartender
                    </button>
                </div>
                <p>Update bartender:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="bartender_id"
                        placeholder="ID"
                        value={this.state.bartender_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bartender_name"
                        placeholder="Name"
                        value={this.state.bartender_name_update}
                        onChange={this.handleNameEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bartender_location"
                        placeholder="Location"
                        value={this.state.bartender_name_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateBartender()}>
                        Update bartender
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Bartender;