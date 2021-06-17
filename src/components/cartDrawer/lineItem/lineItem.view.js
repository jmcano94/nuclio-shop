import React from 'react';
import { Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { useCartContext } from '../../../context/cart';

const LineItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCartContext();
  const handleAddMore = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };
  const handleRemove = () => {
    updateItemQuantity(item.id, item.quantity - 1);
  };

  const handleDelete = () => {
    removeItem(item.id);
  };
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Image boxSize="50px" objectFit="cover" src={item.media.source} alt="image" />
        <Flex flexDirection="column" paddingX={2}>
          <Heading size="md">{item.name}</Heading>
          <Text>{item.price.formatted_with_symbol}</Text>
        </Flex>
      </Flex>
      <Flex justiySelf="flex-end">
        <Flex alignItems="center">
          <IconButton aria-label="remove" icon={<IoRemove />} variant="ghost" onClick={handleRemove} />
          <Text paddingX={2}>{item.quantity}</Text>
          <IconButton aria-label="add" icon={<IoAdd />} variant="ghost" onClick={handleAddMore} />
        </Flex>
        <IconButton
          aria-label="delete-item"
          icon={<RiDeleteBin6Fill />}
          variant="ghost"
          colorScheme="red"
          onClick={handleDelete}
        />
      </Flex>
    </Flex>
  );
};

export default LineItem;
