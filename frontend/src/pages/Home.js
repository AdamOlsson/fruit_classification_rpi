import React from 'react';
import '../App.css';
import SearchField from '../components/SearchField';
//import {Router, Route} from 'react-router';
import Header from '../components/Header';
import QuestionIcon from 'react-icons/lib/fa/question-circle';


class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: '',
            showInformation: true
          };

        this.showInformationPanel = this.showInformationPanel.bind(this);
        this.hideInformationPanel = this.hideInformationPanel.bind(this);

      }

      showInformationPanel(){
        this.setState({
          showInformation: true
        });
      }

      hideInformationPanel(){
        this.setState({
          showInformation: false
        });
      }


    render () {



        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }} >
                <Header label = "Lägg varan på vågen" />
                <div className="question-button" >
                    <span onClick = {this.showInformationPanel} style={{ color: 'white', float: 'left', marginRight: '10px' }}>
                      <QuestionIcon size= "60px" style = {{ marginLeft: '20px'}}/>
                    </span>
                  <div>
                      {this.state.showInformation &&
                        <div onClick = {this.hideInformationPanel}>
                          <img className="information-panel" src={require("../Images/explanation.png")} alt = "" />
                        </div>
                      }
                  </div>
                </div>
                <div style={{ flex: 1, marginTop: '-5%' }}>
                    <SearchField />
                </div>
            </div>
        );
    }
}

export default Home;
