import React from 'react';
import './ListItem.css';
import {TiTimes} from "react-icons/ti";
import {TiInfoLargeOutline} from "react-icons/all";

const {Component} = React;


class ListItem extends Component {
    render() {
        return (<div className="list-item">
            <div className="container">
                <div className="text-container">
                    <p className="list-item-text">{this.props.text}</p>
                </div>
                <div className="icon-container">
                    <button className="info-button" onClick={this.props.onClickInfo}>
                        <TiInfoLargeOutline className="info-icon"/>
                    </button>
                </div>
                <div className="icon-container">
                    <button className="delete-button" onClick={this.props.onClickDelete}>
                        <TiTimes className="delete-icon"/>
                    </button>
                </div>
            </div>
        </div>);
    }
}

export default ListItem;