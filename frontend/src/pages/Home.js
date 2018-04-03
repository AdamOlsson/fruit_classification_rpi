import React from 'react';
import '../App.css';
import SearchField from '../components/SearchField';


//import {Router, Route} from 'react-router';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render () {
        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
                <div className="panel" style={{ flex: 3 }} >
                    <span> Lägg varan på vågen </span>
                </div>
                <div style={{ flex: 1 }}>
                    <span style={{ color: 'Gainsboro' }}> eller sök: </span>
                    <SearchField />
                </div>
            </div>
        );
    }
}

export default Home;
