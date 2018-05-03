nimport React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import ProductItem from '../components/ProductItem';
import ScrollArea from 'react-scrollbar';


class ProductList extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.render = this.render.bind(this);
    }

    render () {
        return (
            <ScrollArea contentClassName="content" className="area">
                {this.props.items.map(function (item) {
                    return (<ProductItem name = {item.name} image = {item.image} price={item.price}/>);
                })}
            </ScrollArea>
        );
    }
}

ProductList.propTypes = {
    items: PropTypes.array.isRequired
};

export default ProductList;
