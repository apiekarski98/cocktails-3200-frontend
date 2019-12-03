import React from 'react';
import './Bar.css';
import ListItem from "../ListItem/ListItem";
const { Component } = React;
const baseURL = 'http://localhost:8000/api/bar/';

class Bar extends Component {
    state = {
        bars: [],
        bar_name: "",
        barDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        bar_id_update: '',
        bar_name_update: '',
        location_id: '',
        city: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const bars = await response.json();
            this.setState({bars});
        } catch (err) {
            return <p>There has been an issue loading the bars. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (bar_id) => {
        try {
            await fetch(baseURL + bar_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (bar_id) => {
        if (bar_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                barDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + bar_id);
                const json = await response.json();
                const barDetail = json[0];
                this.setState({
                    barDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: bar_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddBar = async () => {
        const {bar_name, location} = this.state;
        if (bar_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bar_name
                        }),
                    });
                this.setState({bar_name: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateBar = async () => {
        const {bar_name_update, bar_id_update} = this.state;
        if (bar_id_update && bar_name_update) {
            try {
                await fetch(baseURL + bar_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bar_name: bar_name_update,
                        }),
                    });
                this.setState({
                    bar_name_update: "",
                    bar_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewBar = event => {
        this.setState({bar_name: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({bar_name_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({bar_id_update: event.target.value});
    };

    renderListItem = (bar) => {
        const {bar_id, bar_name} = bar;
        return (
            <div key={bar_id + 'a'}>
                <ListItem
                    key={bar_id + 'b'}
                    text={bar_name}
                    onClickDelete={() => this.onClickDelete(bar_id)}
                    onClickInfo={() => this.onClickInfo(bar_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === bar_id ?
                    <p key={bar_id + 'c'} className="id-label">
                        Bar ID: {this.state.barDetail.bar_id} <br/> Location ID: {this.state.barDetail.location} <br/> City: {this.state.barDetail.city}</p> : null}
            </div>
        );
    };

    render() {
        const {bars} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Bars</h1>
                {bars && bars.map(bar => this.renderListItem(bar))}
            </div>
            <div className="right-container">
                <p>Add new bar:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="bar"
                        placeholder="Name"
                        value={this.state.bar_name}
                        onChange={this.handleNewBar}/>
                    <input
                        className="text-input"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.handleNewBar}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddBar()}>
                        Add bar
                    </button>
                </div>
                <p>Update bar:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="bar_id"
                        placeholder="ID"
                        value={this.state.bar_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bar_name"
                        placeholder="Name"
                        value={this.state.bar_name_update}
                        onChange={this.handleNameEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="bar_location"
                        placeholder="Location"
                        value={this.state.bar_name_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateBar()}>
                        Update bar
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Bar;