import React from 'react';
import '../App.css';

import ProductItem from '../components/ProductItem';
import 'react-notifications/lib/notifications.css';

import banana from '../Images/banana.jpg';
import orange from '../Images/orange.jpg';
import clementine from '../Images/clementine.jpg';
import kiwi from '../Images/kiwi.jpg';
import carrot from '../Images/carrot.jpg';
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
                <ProductItem name="Banan" image={banana} price = "10 kr/kg" />,
                <ProductItem name="Apelsin" image={orange} price = "20 kr/kg" />,
                <ProductItem name="Kiwi" image={kiwi} price = "30 kr/kg" />,
                <ProductItem name="Clementin" image={clementine} price = "40 kr/kg" />,
                <ProductItem name="Morot" image={carrot} price = "60 kr/kg" />,
                <ProductItem name="Päron" image={pear} price = "60 kr/kg" />,
                <ProductItem name="Tomat" image={tomato} price = "60 kr/kg" />,
                <ProductItem name="Avocado" image={avocado} price = "60 kr/kg" />,
                <ProductItem name="Paprika" image={bellpepper} price = "60 kr/kg" />,
                <ProductItem name="Äpple" image={apple} price = "60 kr/kg" />

            ]
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange (event) {
        this.setState({
            value: event.target.value.substr(0, 20) });
    }


    render () {
        /*
        Två arrayer:
        this.props.results innehåller strängar (namn på frukt),
        this.state.products innehåller objekt som innehåller namn på frukter/grönsaker
        Jag vill göra något såhär:
      */
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

                <div style={{ marginBottom: '50px' }}> {filteredProducts.map((product) => {
                    return (<ProductItem
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
