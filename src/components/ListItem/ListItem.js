import React from 'react';
import './ListItem.css';
import { TiTimes } from "react-icons/ti";
const { Component } = React;


class ListItem extends Component {
    render() {
        return (<div className="list-item">
            <div className="container">
                <div className="text-container">
                    <p className="list-item-text">{this.props.text}</p>
                </div>
                <div className="icon-container">
                    <button className="delete-button" onClick={this.props.onClick}>
                        <TiTimes className="delete-icon"/>
                    </button>
                </div>
            </div>
        </div>);
    }
}

export default ListItem;