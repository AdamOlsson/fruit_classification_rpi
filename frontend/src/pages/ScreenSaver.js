import React from 'react';
import '../App.css';
import history from '../history';
import Header from '../components/Header.js'
import HandClick from 'react-icons/lib/fa/hand-pointer-o';
import FontAwesome from 'react-fontawesome';





class ScreenSaver extends React.Component {

   redirectToHome(){
     history.push('/home');
     return null;
   }

    render () {

        return (
          <div onClick = {this.redirectToHome} className="screen-saver" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
              <img style={{width: '80%' }} src={require("../Images/explanation.png")} />
              <div style={{color: 'DimGray', marginTop: '20px'}}>
              <HandClick size='56px' /></div>
              <div style ={{marginTop: '20px'}}> Tryck på skärmen </div>
          </div>
        );
    }
}

export default ScreenSaver;
