import React from 'react';
import { PulseLoader } from 'react-spinners';


class Loading extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    render () {
        return (
            <div className="sweet-loading" style={{ marginTop: '50px' }}>
                <PulseLoader
                    color={'LightBlue'}
                    loading={this.state.loading}
                    size={30}
                />
            </div>
        );
    }
}

export default Loading;
