import React from 'react';
import '../App.css';
import SearchField from '../components/SearchField';
//import {Router, Route} from 'react-router';
import Header from '../components/Header';

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
                <Header label = "Lägg varan på vågen" />
                <div style={{ flex: 1 }}>
                    <SearchField />
                </div>
            </div>
        );
    }
}

export default Home;
