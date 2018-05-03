import React from 'react';
import '../App.css';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import moment from 'moment';
import CheckBox from 'react-icons/lib/fa/check-square';

class Header extends React.Component {

    render () {

      let todaysDate = new Date();
      let formattedDate = moment(todaysDate).format('HH:MM');

        return (
          <div className="panel">

              <div>
                <span style={{ float: 'left', marginLeft: '15px'}}> 00.00 kg </span>
                  <div style = {{display: 'inline-block'}}>
                  <span style={{ float: 'center' }}> {this.props.label} </span>
                  {this.props.icon == "Checkbox" &&
                    <div style={{color: 'green', display: 'inline-block'}}>
                      <CheckBox size = '50px' style = {{marginTop: '-15px'}}/> </div>
                  }
                  </div>
                <span style={{ float: 'right', marginRight: '15px' }}>
                  <ClockIcon style={{marginBottom: '7px'}}/> {formattedDate}
                </span>
              </div>

          </div>

        );
    }
}

export default Header;
