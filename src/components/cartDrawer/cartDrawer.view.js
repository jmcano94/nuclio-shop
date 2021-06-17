import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/cart';
import Cart from '../Cart';

const CartDrawer = () => {
  const { onClose, isOpen, empty } = useCartContext();
  const history = useHistory();
  const handleClickEmpty = () => {
    empty();
    onClose();
  };
  const handleCheckout = () => {
    history.push('/checkout');
    onClose();
  };
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex justifyContent="space-between" alignItems="center">
            Your Shopping Cart
            <IconButton aria-label="remove" icon={<CloseIcon />} variant="ghost" onClick={onClose} />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Cart />
        </DrawerBody>
        <DrawerFooter>
          <Flex width="100%" justifyContent="space-between">
            <Button variant="ghost" mr={3} onClick={handleClickEmpty} colorScheme="red">
              Empty Cart
            </Button>
            <Button colorScheme="yellow" onClick={handleCheckout}>
              Checkout
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
