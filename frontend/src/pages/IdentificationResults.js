import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import ProductItem from '../components/ProductItem';
import SearchField from '../components/SearchField';
import history from '../history';


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


class IdentificationResults extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            identifiedProducts: this.props.results,
            fruit: '',
            results: '',
            value: this.props.results[0],
            response: false,
            endpoint: "http://127.0.0.1:4001", // Address to API
            data: '', //här ska data från Adam in
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
                    <div style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
                        <div>
                            {filteredProducts.map((product) => {
                                return (<ProductItem
                                    name = {product.props.name}
                                    price={product.props.price}
                                    image = {product.props.image} />);
                            })}
                        </div>
                    </div>

                    <div>
                        {filteredProducts.length === 0 &&
                    <span> Tyvärr kunde vi inte identifiera varan. Vänligen sök.</span>}
                    </div>

                    <div style={{ flex: 1, marginTop: '100px', flexDirection: 'row' }} className = "info-text" >
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
