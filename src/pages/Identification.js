import React from 'react';
import '../App.css';
import Loading from '../components/Loading';


class Identification extends React.Component {
    render () {
        return (

            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center' }} >
                <div className="panel" style={{ flex: 3 }} >
                    <span> Identifierar vara </span>
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Loading />
                </div>
            </div>
        );
    }
}

export default Identification;
