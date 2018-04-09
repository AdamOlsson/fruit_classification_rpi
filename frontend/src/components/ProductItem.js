import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import history from '../history';


class ProductItem extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.printLabel = this.printLabel.bind(this);
    }

    printLabel () {
        history.push('/printing');
        setTimeout(function () { history.push('/home');}, 2000);
        return null;
    }

    render () {
        return (
            <div style={{ display: 'inline-block' }} className="list-container">
                <div style={{ display: 'inline-block' }}
                    className="product-item"
                    onClick={this.printLabel}>
                    <img src = {this.props.image} style ={{ opacity: '0.9', width: '80%' }} alt =""/>
                    <div style={{ display: 'inline-block' }}>
                        {this.props.label + ' '}
                        {this.props.price}
                    </div>
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.string.isRequired
};

export default ProductItem;
