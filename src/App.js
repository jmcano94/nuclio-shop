import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Navbar from './components/navbar';
import Shop from './sections/shop';
import { CartContextProvider } from './context/cart';
import Checkout from './sections/checkout';
import Confirmation from './sections/confirmation';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CartContextProvider>
          <div className={styles.app}>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Shop />
              </Route>
              <Route exact path="/checkout">
                <Checkout />
              </Route>
              <Route exact path="/confirmation">
                <Confirmation />
              </Route>
            </Switch>
          </div>
        </CartContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
