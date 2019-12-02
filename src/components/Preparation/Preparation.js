import React from 'react';
import './Preparation.css';
import ListItem from "../ListItem/ListItem";
const { Component } = React;

const baseURL = 'http://localhost:8000/api/preparation/';

class Preparation extends Component {
    state = {
        steps: [],
        step: "",
        stepDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        step_id_update: '',
        step_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const steps = await response.json();
            this.setState({steps});
        } catch (err) {
            return <p>There has been an issue loading the preparation steps. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (step_id) => {
        try {
            await fetch(baseURL + step_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (step_id) => {
        if (step_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                stepDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + step_id);
                const json = await response.json();
                const stepDetail = json[0];
                this.setState({
                    stepDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: step_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddStep = async () => {
        const {step} = this.state;
        if (step) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            step
                        }),
                    });
                this.setState({step: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateStep = async () => {
        const {step_update, step_id_update} = this.state;
        if (step_id_update && step_update) {
            try {
                await fetch(baseURL + step_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            step: step_update,
                        }),
                    });
                this.setState({
                    step_update: "",
                    step_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewStep = event => {
        this.setState({step: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({step_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({step_id_update: event.target.value});
    };

    renderListItem = (s) => {
        const {step_id, step} = s;
        return (
            <div key={step_id + 'a'}>
                <ListItem
                    key={step_id + 'b'}
                    text={step}
                    onClickDelete={() => this.onClickDelete(step_id)}
                    onClickInfo={() => this.onClickInfo(step_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === step_id ?
                    <p key={step_id + 'c'} className="id-label">
                        step ID: {this.state.stepDetail.step_id}</p> : null}
            </div>
        );
    };

    render() {
        const {steps} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Preparation</h1>
                {steps && steps.map(s => this.renderListItem(s))}
            </div>
            <div className="right-container">
                <p>Add new step:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="step"
                        placeholder="Name"
                        value={this.state.step}
                        onChange={this.handleNewStep}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddStep()}>
                        Add step
                    </button>
                </div>
                <p>Update step:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="step_id"
                        placeholder="ID"
                        value={this.state.step_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="step"
                        placeholder="Name"
                        value={this.state.step_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateStep()}>
                        Update step
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Preparation;