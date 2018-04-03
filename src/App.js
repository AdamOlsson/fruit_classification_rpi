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
            weightRecognized: false,
            bestResults: '',
            isFull: false,
            response: false,
            endpoint: "http://127.0.0.1:4001" // Address to API
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount () {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => { // VIKTIGT ATT DET STÅR "FromAPI"
            this.sendProperties(data);
            this.setState({ response: true });
        });
    }


    /*loadData () {
        this.setState({ outputChange: data.output });
        return data.output;
    }*/

    goFull = () => {
        this.setState({ isFull: true });
    }

    sendProperties (data) {
        var tempArray = [];

        this.setState({ passedData: data.results[0].object });
        data.results.map(function (prod) {
            if (prod.accuracy >= 0.1) {
                tempArray.push(prod.object);
            }
        });
        this.setState({ bestResults: tempArray });
        console.log(this.state.bestResults);
    }


    redirectToIdentification () {
        history.push('/identification');
        setTimeout(function () {
            history.push('/IdentificationResults');
        }, 2000);
        return null;
    }

    redirectToHome () {
        history.push('/home');
        return null;
    }

    render () {
        const { response } = this.state;

        if (response === true) {
            this.redirectToIdentification();
        }


        if (this.state.weightRecognized === true) {
            history.push('/identification');
            return null;
        }

        if (this.state.weightRecognized === false) {
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
                                        state = {this.passedData}
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
}

App.PropTypes = {
    identifiedProducts: PropTypes.array.isRequired,
    fruit: PropTypes.string.isRequired,
    router: PropTypes.router
};


export default App;
