import React from 'react';
import '../App.css';
import Loading from '../components/Loading';
import Info from 'react-icons/lib/fa/info-circle';



class Printing extends React.Component {
    render () {
        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
                <div className="panel" style={{ flex: 3 }} >
                    <span> Skriver ut etikett . . . </span>
                </div>
                <div style={{display: 'inline-block', color: 'white'}}>
                  <Info size= "60px" style={{marginTop: '-10px' }}/>
                  <div style={{padding: '20px', display: 'inline-block'}}>
                  <span style={{ color: 'Gainsboro', paddingTop: '80px' }} > Ta din etikett</span>
                  </div>
              </div>

                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Loading />
                </div>
            </div>
        );
    }
}

export default Printing;
