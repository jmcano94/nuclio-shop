import { Flex, Box, Image, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import Rating from './rating';
import { useCartContext } from '../../context/cart';

const ProductItem = ({ product }) => {
  const { addToCart } = useCartContext();
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image src={product.media.source} alt={`Picture of ${product.name}`} roundedTop="lg" />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {product.name}
            </Box>
            <Tooltip label="Add to cart" bg="white" placement="top" color="gray.800" fontSize="1.2em">
              <chakra.a display="flex" onClick={() => addToCart(product.id, 1)}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center" />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={5} numReviews={10} />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {product.price.formatted_with_symbol}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductItem;
