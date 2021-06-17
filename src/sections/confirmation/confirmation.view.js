import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { AiFillShopping } from 'react-icons/all';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/cart';

const Confirmation = () => {
  const { order } = useCartContext();
  const history = useHistory();
  if (!order) {
    history.push('/');
    return null;
  }
  return (
    <Container maxW="container.lg" paddingTop={8}>
      <VStack spacing={12}>
        <Heading>
          Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!
        </Heading>
        <Text fontSize="2xl">Order ref: {order.customer_reference}</Text>
        <Text fontSize="xl" noOfLines={3}>
          This is your order reference code, write it down and use it to keep track of your shipment process.
        </Text>
        <Text fontSize="xl">
          We have also sent you an email to <b>{order.customer.email}</b> with all the details of your order.
        </Text>
        <Button colorScheme="yellow" rightIcon={<AiFillShopping />} onClick={() => history.push('/')}>
          Back to shop
        </Button>
      </VStack>
    </Container>
  );
};

export default Confirmation;
