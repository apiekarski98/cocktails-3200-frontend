import React from 'react';
import './Bartender.css';
import ListItem from "../ListItem/ListItem";

const {Component} = React;
const baseURL = 'http://localhost:8000/api/bartender/';

class Bartender extends Component {
    state = {
        bartenders: [],
        bartender_first_name: "",
        bartender_last_name: "",
        bartender_bar_id: "",
        bartenderDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        bartender_id_update: '',
        bartender_f_name_update: '',
        bartender_l_name_update: '',
        bartender_bar_update: '',
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
        const {bartender_first_name, bartender_last_name, bartender_bar_id} = this.state;
        if (bartender_first_name && bartender_last_name && bartender_bar_id) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            first_name: bartender_first_name,
                            last_name: bartender_last_name,
                            bar: bartender_bar_id,
                        }),
                    });
                this.setState(
                    {
                        bartender_first_name: "",
                        bartender_last_name: "",
                        bartender_bar_id: "",
                    });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateBartender = async () => {
        const {bartender_id_update, bartender_f_name_update, bartender_l_name_update, bartender_bar_update} = this.state;
        if (bartender_f_name_update && bartender_l_name_update && bartender_bar_update) {
            try {
                await fetch(baseURL + bartender_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            first_name: bartender_f_name_update,
                            last_name: bartender_l_name_update,
                            bar: bartender_bar_update,
                        }),
                    });
                this.setState({
                    bartender_id_update: "",
                    bartender_f_name_update: "",
                    bartender_l_name_update: "",
                    bartender_bar_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewFirstName = event => {
        this.setState({bartender_first_name: event.target.value});
    };

    handleNewLastName = event => {
        this.setState({bartender_last_name: event.target.value});
    };

    handleNewBarID = event => {
        this.setState({bartender_bar_id: event.target.value});
    };

    handleIdUpdate = event => {
        this.setState({bartender_id_update: event.target.value});
    };

    handleFNameUpdate = event => {
        this.setState({bartender_f_name_update: event.target.value});
    };

    handleLNameUpdate = event => {
        this.setState({bartender_l_name_update: event.target.value});
    };

    handleBarUpdate = event => {
        this.setState({bartender_bar_update: event.target.value});
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
                        name="first_name"
                        placeholder="First name"
                        value={this.state.bartender_first_name}
                        onChange={this.handleNewFirstName}/>
                    <input
                        className="text-input"
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        value={this.state.bartender_last_name}
                        onChange={this.handleNewLastName}/>
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="bar"
                        placeholder="Bar ID"
                        value={this.state.bartender_bar_id}
                        onChange={this.handleNewBarID}/>
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
                        type="number"
                        min={0}
                        name="bartender_id"
                        placeholder="Bartender ID"
                        value={this.state.bartender_id_update}
                        onChange={this.handleIdUpdate}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bartender_first_name"
                        placeholder="First name"
                        value={this.state.bartender_f_name_update}
                        onChange={this.handleFNameUpdate}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bartender_last_name"
                        placeholder="Last name"
                        value={this.state.bartender_l_name_update}
                        onChange={this.handleLNameUpdate}/>
                    <input
                        className="text-input"
                        type="number"
                        min={0}
                        name="bartender_bar_id"
                        placeholder="Bar ID"
                        value={this.state.bartender_bar_update}
                        onChange={this.handleBarUpdate}/>
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