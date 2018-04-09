import React from 'react';
import '../App.css';
import Strings from '../Strings.json';


import ProductItem from '../components/ProductItem';
import 'react-notifications/lib/notifications.css';

import banana from '../Images/banana.jpg';
import orange from '../Images/orange.jpg';
import clementine from '../Images/clementine.jpg';
import kiwi from '../Images/kiwi.jpg';
import potato from '../Images/potato.jpg';
import pear from '../Images/pear.jpg';
import avocado from '../Images/avocado.jpg';
import tomato from '../Images/tomato.jpg';
import apple from '../Images/apple.jpg';
import bellpepper from '../Images/bellpepper.jpg';


class SearchField extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: '',
            currentlyDisplayed: this.props.products,
            products: [
                <ProductItem label = {Strings.banana} name="banana" image={banana} price = "25 kr/kg" />,
                <ProductItem label = {Strings.orange} name="orange" image={orange} price = "23 kr/kg" />,
                <ProductItem label = {Strings.kiwi} name="kiwi" image={kiwi} price = "55 kr/kg" />,
                <ProductItem label = {Strings.clementine} name="clementine" image={clementine} price = "39 kr/kg" />,
                <ProductItem label = {Strings.potato} name="potato" image={potato} price = "12 kr/kg" />,
                <ProductItem label = {Strings.pear} name="pear" image={pear} price = "29 kr/kg" />,
                <ProductItem label = {Strings.tomato} name="tomato" image={tomato} price = "45 kr/kg" />,
                <ProductItem label = {Strings.avocado} name="avocado" image={avocado} price = "85 kr/kg" />,
                <ProductItem label = {Strings.bellpepper} name="bellpepper" image={bellpepper} price = "59 kr/kg" />,
                <ProductItem label = {Strings.apple} name="apple" image={apple} price = "35 kr/kg" />

            ]
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange (event) {
        this.setState({
            value: event.target.value.substr(0, 20) });
    }


    render () {

        let filteredProducts = this.state.products.filter(
            (product) => {
                return product.props.name.toLowerCase().indexOf(
                    this.state.value.toLowerCase()) !== -1;
            }
        );

        return (
            <div style={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
                <div style ={{ flex: 1, flexDirection: 'row' }}>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input className="text-input" type="text" placeholder = "Sök.."
                                select="false"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </label>
                    </form>
                </div>
                <div style={{ marginBottom: '100px' }}> {filteredProducts.map((product) => {
                    return (<ProductItem
                        label = {product.props.label}
                        name = {product.props.name}
                        price={product.props.price}
                        image = {product.props.image} />);
                })}
                </div>

                <div>
                    {filteredProducts.length === 0 &&
                      <span style={{ color: 'Gainsboro' }}> Sökningen hittades inte. Sök igen eller kontakta personal.</span>}
                </div>

            </div>
        );
    }
}


export default SearchField;
