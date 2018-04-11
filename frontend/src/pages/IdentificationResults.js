import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import ProductItem from '../components/ProductItem';
import SearchField from '../components/SearchField';
import history from '../history';
import Strings from '../Strings.json';

import potato from '../Images/potato.jpg';
import banana from '../Images/banana.jpg';
import orange from '../Images/orange.jpg';
import clementine from '../Images/clementine.jpg';
import kiwi from '../Images/kiwi.jpg';
import pear from '../Images/pear.jpg';
import avocado from '../Images/avocado.jpg';
import tomato from '../Images/tomato.jpg';
import apple from '../Images/apple.jpg';
import bellpepper from '../Images/bellpepper.jpg';


class IdentificationResults extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            identifiedProducts: this.props.results,
            results: '',
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
    }

    redirectToHome () {
        history.push('/home');
        return null;
    }

    render () {
        let filteredProducts = this.state.products.filter((product) => {
            return this.props.results.includes(product.props.name);
        });


        if (filteredProducts.length === 0) {
            return (
                <div className="App" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center' }} >
                    <div className="panel" style={{ flex: 1 }} >
                        <span> Produkten hittades inte. Vänligen sök. </span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <SearchField />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center' }} >
                    <div className="panel" style={{ flex: 1 }} >
                        <span> Välj önskad vara </span>
                    </div>
                    <div style={{ justifyContent: 'center', alignItems: 'center', maxHeight: '50%' }}>
                        <div>
                            {filteredProducts.map((product) => {
                                return (<ProductItem
                                    label = {product.props.label}
                                    price={product.props.price}
                                    image = {product.props.image} />);
                            })}
                        </div>
                    </div>

                    <div>
                        {filteredProducts.length === 0 &&
                    <span> Tyvärr kunde systemet inte identifiera varan. Vänligen sök.</span>}
                    </div>

                    <div style={{ flex: 1, flexDirection: 'row' }} className = "info-text" >
                        <div>Hittades inte din vara?</div>
                        <div><button className="link-button" onClick={this.redirectToHome}>
                          Sök vara
                        </button>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

IdentificationResults.propTypes = {
    products: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired
};

export default IdentificationResults;
