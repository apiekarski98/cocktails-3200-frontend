import React from 'react';
import './App.css';

const { Component } = React;

class App extends Component {
    onClick = (page) => {
        this.props.history.push('/' + page);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a className="header">Cocktails</a>
                    <button className='button' onClick={() => this.onClick('ingredient')}>Ingredients
                    </button>
                    <button className='button' onClick={() => this.onClick('garnish')}>Garnishes
                    </button>
                    <button className='button' onClick={() => this.onClick('bartender')}>Bartenders
                    </button>
                    <button className='button' onClick={() => this.onClick('bar')}>Bars
                    </button>
                    <button className='button' onClick={() => this.onClick('location')}>Locations
                    </button>
                    <button className='button' onClick={() => this.onClick('glassware')}>Glassware
                    </button>
                    <button className='button' onClick={() => this.onClick('cocktail')}>Cocktails
                    </button>
                </header>
            </div>
        );
    }
}

export default App;
