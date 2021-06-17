import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, HStack, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { MdPayment } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/cart';
import { commerce } from '../../api';
import Cart from '../../components/Cart';
import CheckoutForm from '../../components/checkoutForm';

const Checkout = () => {
  // eslint-disable-next-line no-unused-vars
  const [checkoutToken, setCheckoutToken] = useState(undefined);
  const [submit, setSubmit] = useState(false);
  const { getItems, cart, getSanitizedLineItems, refreshCart, setOrder } = useCartContext();
  const history = useHistory();
  useEffect(() => {
    if (getItems().length) {
      commerce.checkout
        .generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          setCheckoutToken({ ...token });
        })
        .catch((error) => {
          console.log('There was an error in generating a token', error);
        });
    }
  }, [getItems]);

  const onFormSubmitted = (data) => {
    const orderData = {
      line_items: getSanitizedLineItems(),
      customer: {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
      },
      shipping: {
        name: data.shippingName,
        street: data.shippingStreet,
        town_city: data.shippingCity,
        county_state: data.shippingStateProvince,
        postal_zip_code: data.shippingPostalZipCode,
        country: data.shippingCountry,
      },
      fulfillment: {
        shipping_method: data.shippingOption,
      },
      payment: {
        gateway: 'test_gateway',
        card: {
          number: data.cardNum,
          expiry_month: data.expMonth,
          expiry_year: data.expYear,
          cvc: data.ccv,
          postal_zip_code: data.shippingPostalZipCode,
        },
      },
    };
    commerce.checkout
      .capture(checkoutToken.id, orderData)
      .then((order) => {
        setOrder({ ...order });
        // Clear the cart
        refreshCart();
        // Send the user to the receipt
        history.push('/confirmation');
        // Store the order in session storage so we can show it again if the
        // user refreshes the page!
        window.sessionStorage.setItem('order_receipt', JSON.stringify(order));
      })
      .catch((error) => {
        console.log('There was an error confirming your order', error);
      });
    console.log(orderData);
  };

  const onClickSubmit = () => {
    setSubmit(true);
  };

  const onClickKeepShopping = () => {
    history.push('/');
  };

  return (
    <Container maxW="container.lg" paddingTop={8}>
      <Wrap alignItems="top" spacing={20}>
        <WrapItem w="50%" justifyContent="center">
          <CheckoutForm
            onFormSubmit={onFormSubmitted}
            submit={submit}
            setSubmit={setSubmit}
            checkoutToken={checkoutToken}
          />
        </WrapItem>
        <WrapItem>
          <VStack spacing={4}>
            <Heading size="lg">Your products</Heading>
            <Cart />
          </VStack>
        </WrapItem>
        <WrapItem>
          <HStack spacing={8}>
            <Button variant="ghost" colorScheme="blue" leftIcon={<ArrowBackIcon />} onClick={onClickKeepShopping}>
              Keep Shopping
            </Button>
            <Button colorScheme="yellow" rightIcon={<MdPayment />} onClick={onClickSubmit}>
              Confirm Order
            </Button>
          </HStack>
        </WrapItem>
      </Wrap>
    </Container>
  );
};

export default Checkout;
