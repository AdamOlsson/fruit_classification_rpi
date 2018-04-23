import React from 'react';
import '../App.css';
import FaIconPack from 'react-icons/lib/fa'
import ClockIcon from 'react-icons/lib/fa/clock-o';
import moment from 'moment';

class Header extends React.Component {
    render () {

      let todaysDate = new Date();
      let formattedDate = moment(todaysDate).format('HH:MM');

        return (
          <div className="panel">
              <div>
                <span style={{ float: 'left', marginLeft: '10px'}}> 00.00 kg </span>
                <span style={{ float: 'center'}}> {this.props.label} </span>
                <span style={{ float: 'right', marginRight: '10px' }}>
                  <ClockIcon style={{marginBottom: '7px'}}/> {formattedDate}
                </span>
              </div>
          </div>
        );
    }
}

export default Header;
