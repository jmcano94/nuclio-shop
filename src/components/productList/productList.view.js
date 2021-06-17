import React from 'react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import ProductItem from '../productItem';

const ProductList = ({ products }) => {
  return (
    <Wrap>
      {products.map((product) => (
        <WrapItem>
          <ProductItem product={product} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ProductList;
