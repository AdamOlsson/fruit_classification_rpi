import React from 'react';
import '../App.css';
import Loading from '../components/Loading';


class Printing extends React.Component {
    render () {
        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
                <div className="panel" style={{ flex: 3 }} >
                    <span> Skriver ut etikett </span>
                </div>
                <span style={{ color: 'Gainsboro', margin: '30px' }} > Ta din etikett</span>

                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Loading />
                </div>
            </div>
        );
    }
}

export default Printing;
