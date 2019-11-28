import React from 'react';
import './Glassware.css';
import ListItem from "../ListItem/ListItem";
const { Component } = React;

const baseURL = 'http://localhost:8000/api/glassware/';

class Glassware extends Component {
    state = {
        glassware: [],
        glassware_name: "",
        glasswareDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        glassware_id_update: '',
        glassware_name_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const glassware = await response.json();
            this.setState({glassware});
        } catch (err) {
            return <p>There has been an issue loading the glassware. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (glassware_id) => {
        try {
            await fetch(baseURL + glassware_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (glassware_id) => {
        if (glassware_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                glasswareDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + glassware_id);
                const json = await response.json();
                const glasswareDetail = json[0];
                this.setState({
                    glasswareDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: glassware_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddGlassware = async () => {
        const {glassware_name} = this.state;
        if (glassware_name) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            glassware_name
                        }),
                    });
                this.setState({glassware_name: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateGlassware = async () => {
        const {glassware_name_update, glassware_id_update} = this.state;
        if (glassware_id_update && glassware_name_update) {
            try {
                await fetch(baseURL + glassware_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            glassware_name: glassware_name_update,
                        }),
                    });
                this.setState({
                    glassware_name_update: "",
                    glassware_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewGlassware = event => {
        this.setState({glassware_name: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({glassware_name_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({glassware_id_update: event.target.value});
    };

    renderListItem = (glassware) => {
        const {glassware_id, glassware_name} = glassware;
        return (
            <div key={glassware_id + 'a'}>
                <ListItem
                    key={glassware_id + 'b'}
                    text={glassware_name}
                    onClickDelete={() => this.onClickDelete(glassware_id)}
                    onClickInfo={() => this.onClickInfo(glassware_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === glassware_id ?
                    <p key={glassware_id + 'c'} className="id-label">
                        glassware ID: {this.state.glasswareDetail.glassware_id}</p> : null}
            </div>
        );
    };

    render() {
        const {glassware} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Glassware</h1>
                {glassware && glassware.map(glassware => this.renderListItem(glassware))}
            </div>
            <div className="right-container">
                <p>Add new glassware:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="glassware"
                        placeholder="Name"
                        value={this.state.glassware_name}
                        onChange={this.handleNewGlassware}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddGlassware()}>
                        Add glassware
                    </button>
                </div>
                <p>Update glassware name:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="glassware_id"
                        placeholder="ID"
                        value={this.state.glassware_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="glassware_name"
                        placeholder="Name"
                        value={this.state.glassware_name_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateGlassware()}>
                        Update glassware name
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Glassware;