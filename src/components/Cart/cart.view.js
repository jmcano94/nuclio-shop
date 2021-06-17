import React from 'react';
import { Box, Divider, Flex, Heading, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import LineItem from '../cartDrawer/lineItem';
import { useCartContext } from '../../context/cart';

const Cart = () => {
  const { getItems, getTotal } = useCartContext();
  return (
    <Flex flexDirection="column" height="100%" width="100%">
      <Box alignSelf="start" height="100%" width="100%">
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
          {getItems().map((item) => (
            <Box boxShadow="base" p="2" rounded="md" bg="white">
              <LineItem item={item} />
            </Box>
          ))}
        </VStack>
      </Box>
      <Divider />
      <Flex alignSelf="end" paddingY={4} paddingRight={8} alignContent="center" width="100%">
        <Heading size="md">Total:</Heading>
        <Spacer />
        <Text fontSize="lg">{getTotal()}</Text>
      </Flex>
    </Flex>
  );
};

export default Cart;
