import React, { Component } from 'react';
import './App.css';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import history from './history';
import { Router, Route } from 'react-router-dom';
import Fullscreen from "react-full-screen";
import socketIOClient from "socket.io-client";
import PropTypes from 'prop-types';

import Home from "./pages/Home";
import Identification from "./pages/Identification";
import IdentificationResults from "./pages/IdentificationResults";

import Printing from "./pages/Printing";


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bestResults: '',
            isFull: false,
            response: false,
            endpoint: "http://127.0.0.1:4001"
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount () {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => {
            this.setState({ response: true });
        });
    }

    goFull = () => {
        this.setState({ isFull: true });
    }

    redirectToIdentification(){
      history.push('/identification');
    }

    redirectToHome () {
        history.push('/home');
        return null;
    }

    render () {
        const { response } = this.state;

        if (response === true) {
          history.push('/identification');
        }
            return (
                <div>
                    <button onClick={this.goFull}>
                            Go Fullscreen
                    </button>

                    <Fullscreen
                        enabled={this.state.isFull}
                        onChange={isFull => this.setState({ isFull })}>
                        <div className="full-screenable-node">
                            <KeyHandler
                                keyEventName={KEYPRESS}
                                keyValue="s"
                                onKeyHandle={this.redirectToIdentification} />

                            <Router history={history}>
                                <div>
                                    <Route exact path="/" component = {Home} />
                                    <Route path="/identification"
                                        component = {Identification}
                                    />
                                    <Route path="/home" component = {Home} />
                                    <Route path="/printing" component = {Printing} />
                                    <Route path="/identificationResults"
                                        component = {(props) =>
                                            <IdentificationResults results = {this.state.bestResults} />}
                                    />
                                </div>
                            </Router>
                        </div>
                    </Fullscreen>
                </div>
            );
    }
}

App.PropTypes = {
    identifiedProducts: PropTypes.array.isRequired,
    fruit: PropTypes.string.isRequired,
    router: PropTypes.router
};


export default App;
