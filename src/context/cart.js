import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { commerce } from '../api';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    commerce.cart
      .retrieve()
      .then((apiCart) => {
        setCart({ ...apiCart });
      })
      .catch((error) => {
        console.error('There was an error fetching the cart', error);
      });
  }, []);

  const addToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart({ ...item.cart });
      })
      .catch((error) => {
        console.error('There was an error adding the item to the cart', error);
      });
  };

  const isLoaded = () => cart !== undefined;
  const getItems = useCallback(() => {
    return isLoaded() ? cart.line_items : [];
  }, [cart]);

  const updateItemQuantity = (lineItemId, newQuantity) => {
    commerce.cart
      .update(lineItemId, { quantity: newQuantity })
      .then((resp) => {
        setCart({ ...resp.cart });
      })
      .catch((error) => {
        console.log('There was an error updating the cart items', error);
      });
  };

  const removeItem = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart({ ...resp.cart });
      })
      .catch((error) => {
        console.error('There was an error removing the item from the cart', error);
      });
  };

  const empty = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart({ ...resp.cart });
      })
      .catch((error) => {
        console.error('There was an error emptying the cart', error);
      });
  };
  const getSanitizedLineItems = useCallback(() => {
    return cart.line_items.reduce((data, lineItem) => {
      const item = data;
      let variantData = null;
      if (lineItem.selected_options && lineItem.selected_options.length) {
        variantData = {
          [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
        };
      }
      item[lineItem.id] = {
        quantity: lineItem.quantity,
        variants: variantData,
      };
      return item;
    }, {});
  }, [cart]);

  const refreshCart = () => {
    commerce.cart
      .refresh()
      .then((newCart) => {
        setCart({ ...newCart });
      })
      .catch((error) => {
        console.log('There was an error refreshing your cart', error);
      });
  };

  const getTotal = useCallback(() => {
    return isLoaded() ? cart.subtotal.formatted_with_symbol : '$0.00';
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        getItems,
        isLoaded,
        addToCart,
        isOpen,
        onOpen,
        onClose,
        getTotal,
        updateItemQuantity,
        removeItem,
        empty,
        getSanitizedLineItems,
        refreshCart,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const {
    getItems,
    isLoaded,
    addToCart,
    isOpen,
    onOpen,
    onClose,
    getTotal,
    updateItemQuantity,
    removeItem,
    empty,
    cart,
    getSanitizedLineItems,
    refreshCart,
    order,
    setOrder,
  } = useContext(CartContext);
  return {
    isLoaded,
    addToCart,
    isOpen,
    onOpen,
    onClose,
    getItems,
    getTotal,
    updateItemQuantity,
    removeItem,
    empty,
    cart,
    getSanitizedLineItems,
    refreshCart,
    order,
    setOrder,
  };
};
