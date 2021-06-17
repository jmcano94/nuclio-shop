import { useEffect, useState } from 'react';
import { commerce } from '../../api';
import ProductList from '../../components/productList';
import CartDrawer from '../../components/cartDrawer';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    commerce.products
      .list()
      .then((res) => setProducts(res.data))
      .catch((error) => console.log('there was an error fetching the products', error));
  }, []);
  return (
    <div>
      <CartDrawer />
      <ProductList products={products} />
    </div>
  );
};

export default Shop;
