import React from 'react';
import './Location.css';
import ListItem from "../ListItem/ListItem";

const {Component} = React;

const baseURL = 'http://localhost:8000/api/location/';

class Location extends Component {
    state = {
        locations: [],
        city: "",
        locationDetail: {},
        isDisplayingDetails: false,
        currentDisplayedId: -1,
        location_id_update: '',
        city_update: '',
    };

    async getData() {
        try {
            const response = await fetch(baseURL);
            const locations = await response.json();
            this.setState({locations});
        } catch (err) {
            return <p>There has been an issue loading the locations. Please try again</p>;
        }
    }

    componentDidMount() {
        this.getData();
    }

    onClickDelete = async (location_id) => {
        try {
            await fetch(baseURL + location_id,
                {
                    method: 'DELETE',
                });
            await this.getData();
        } catch (err) {
            throw err;
        }
    };

    onClickInfo = async (location_id) => {
        if (location_id === this.state.currentDisplayedId && this.state.isDisplayingDetail) {
            this.setState({
                isDisplayingDetail: false,
                locationDetail: {},
            });
        } else {
            try {
                const response = await fetch(baseURL + location_id);
                const json = await response.json();
                const locationDetail = json[0];
                this.setState({
                    locationDetail,
                    isDisplayingDetail: true,
                    currentDisplayedId: location_id,
                });
            } catch (err) {
                throw err;
            }
        }
    };

    onClickAddLocation = async () => {
        const {city} = this.state;
        if (city) {
            try {
                await fetch(baseURL,
                    {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            city
                        }),
                    });
                this.setState({city: ""});
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    onClickUpdateLocation = async () => {
        const {city_update, location_id_update} = this.state;
        if (location_id_update && city_update) {
            try {
                await fetch(baseURL + location_id_update,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            city: city_update,
                        }),
                    });
                this.setState({
                    city_update: "",
                    location_id_update: "",
                });
                await this.getData();
            } catch (err) {
                throw err;
            }
        }
    };

    handleNewLocation = event => {
        this.setState({city: event.target.value});
    };

    handleNameEntry = event => {
        this.setState({city_update: event.target.value});
    };

    handleIdEntry = event => {
        this.setState({location_id_update: event.target.value});
    };

    renderListItem = (location) => {
        const {location_id, city} = location;
        return (
            <div key={location_id + 'a'}>
                <ListItem
                    key={location_id + 'b'}
                    text={city}
                    onClickDelete={() => this.onClickDelete(location_id)}
                    onClickInfo={() => this.onClickInfo(location_id)}
                />
                {this.state.isDisplayingDetail && this.state.currentDisplayedId === location_id ?
                    <p key={location_id + 'c'} className="id-label">
                        Location ID: {this.state.locationDetail.location_id}</p> : null}
            </div>
        );
    };

    render() {
        const {locations} = this.state;
        return <div className="container">
            <div className="left-container">
                <h1 className="page-label">Locations</h1>
                {locations && locations.map(location => this.renderListItem(location))}
            </div>
            <div className="right-container">
                <p>Add new city:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="location"
                        placeholder="Name"
                        value={this.state.city}
                        onChange={this.handleNewLocation}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickAddLocation()}>
                        Add city
                    </button>
                </div>
                <p>Update city:</p>
                <div className="edit-container">
                    <input
                        className="text-input"
                        type="text"
                        name="location_id"
                        placeholder="ID"
                        value={this.state.location_id_update}
                        onChange={this.handleIdEntry}/>
                    <input
                        className="text-input"
                        type="text"
                        name="city"
                        placeholder="Name"
                        value={this.state.city_update}
                        onChange={this.handleNameEntry}/>
                    <button
                        className="edit-button"
                        onClick={() => this.onClickUpdateLocation()}>
                        Update city
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Location;