import React from 'react';
import '../App.css';
import SearchField from '../components/SearchField';
//import {Router, Route} from 'react-router';
import Header from '../components/Header';
import history from '../history.js'

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    calculateToScreenSaver(){
      setTimeout(function() {
        history.push('/');
      }, 20000)
    }

    render () {
      this.calculateToScreenSaver();

        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
                <Header label = "Lägg varan på vågen"/>
                <div style={{ flex: 1 }}>
                    <SearchField />
                </div>
            </div>
        );
    }
}

export default Home;
