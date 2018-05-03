import React from 'react';
import '../App.css';
import Loading from '../components/Loading';
import socketIOClient from "socket.io-client";
import IdentificationResults from "./IdentificationResults";
import Info from 'react-icons/lib/fa/info-circle';


class Identification extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          bestResults: '',
          response: false,
          endpoint: "http://127.0.0.1:4001"
      };
      this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount () {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("FromAPI", data => {
      this.sendProperties(data);
      this.setState({ response: true });
      });
  }

  sendProperties (data) {
      var tempArray = [];

      data.results.map(function (prod) {
          if (prod.accuracy >= 0.05) {
              tempArray.push(prod.object);
          }
      });
      this.setState({ bestResults: tempArray });
  }


    render () {

      const { response } = this.state;

      if (response === true) {
          return( <IdentificationResults results = {this.state.bestResults} />);
      }

        return (

            <div className="App" style={{ display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center' }} >
                <div className="panel" style={{ flex: 3 }} >
                    <span> Vänta . . . </span>
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{display: 'inline-block', color: 'white'}}>
                    <Info size= "60px" style={{marginTop: '-10px' }}/>
                    <div style={{padding: '20px', display: 'inline-block'}}>
                    <span style={{ color: 'Gainsboro', paddingTop: '80px' }} > Identifierar vara </span>
                    </div>
                </div>
                    <Loading />
                </div>
            </div>
        );
    }
}

export default Identification;
