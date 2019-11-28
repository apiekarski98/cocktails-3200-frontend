import React from 'react';
import './ListItem.css';
import {TiTimes} from "react-icons/ti";
import {TiInfoLargeOutline} from "react-icons/all";

const {Component} = React;


class ListItem extends Component {

    capitalize = (text) => text.charAt(0).toUpperCase() + text.substring(1);

    render() {
        const { text, onClickDelete, onClickInfo } = this.props;
        return (<div className="list-item">
            <div className="container">
                <div className="text-container">
                    <p className="list-item-text">{this.capitalize(text)}</p>
                </div>
                <div className="icon-container">
                    <button className="info-button" onClick={onClickInfo}>
                        <TiInfoLargeOutline className="info-icon"/>
                    </button>
                </div>
                <div className="icon-container">
                    <button className="delete-button" onClick={onClickDelete}>
                        <TiTimes className="delete-icon"/>
                    </button>
                </div>
            </div>
        </div>);
    }
}

export default ListItem;