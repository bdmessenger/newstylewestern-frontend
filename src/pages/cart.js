import {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import Layout from 'components/Layout'
import {FaTrash} from 'react-icons/fa'
import {Box, Flex, Text, Heading, Grid, GridItem, Stack, StackDivider, Image, Button, Icon, Spacer} from '@chakra-ui/react'
import {CartContext} from 'context/cartContext'

const CartPage = ({history: {push}}) => {
  const {cartItems, total, removeProduct, increase, decrease, clearCart} = useContext(CartContext)

  return (
    <Layout title="Cart">
      <Stack spacing={{base: 2, lg: 5}}>
      <Heading>My Cart</Heading>
      { cartItems.length > 0 ? (
        <Stack
          fontWeight="semibold"
          divider={<StackDivider borderColor="gray.200"/>}
          spacing={5}
        >
          <Grid display={{base: 'none', md: 'grid'}} alignItems="center" gap={10} gridTemplateColumns={{base: "1.5fr 0.5fr 0.5fr 0.3fr 0.1fr", lg:"2fr 0.5fr 0.5fr 0.5fr 0.1fr"}}>
            <GridItem>Product</GridItem>
            <GridItem>Price</GridItem>
            <GridItem>QTY</GridItem>
            <GridItem>Total</GridItem>
          </Grid>
          {cartItems.map((item, i) => (
            <Box key={i}>
              <Grid display={{base: 'none', md: 'grid'}} alignItems="center" gap={10} gridTemplateColumns={{base: "1.5fr 0.5fr 0.5fr 0.3fr 0.1fr", lg: "2fr 0.5fr 0.5fr 0.5fr 0.1fr"}}>
                <Flex alignItems="center" gridGap="50px">
                  <Image width="100px" height="100px" src={item.color.image} />
                  <Text>{item.title} - {item.color.name} / {item.size}</Text>
                </Flex>
                <Text>${item.price.toFixed(2)}</Text>
                <Flex alignItems="center">
                  <Button onClick={() => decrease(item)}>-</Button>
                  <Spacer/>
                  {item.quantity}
                  <Spacer/>
                  <Button onClick={() => increase(item)}>+</Button>
                </Flex>
                <Text>${(item.quantity * item.price).toFixed(2)}</Text>
                <Button onClick={() => removeProduct(item)} colorScheme="red">
                  <Icon as={FaTrash} />
                </Button>
              </Grid>
              <Stack display={{md: 'none'}}>
                <Flex alignItems="center" gridGap="30px" width="100%">
                  <Image width="30%" src={item.color.image} />
                  <Text>{item.title} - {item.color.name} / {item.size}</Text>
                </Flex>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Total Amount: ${(item.quantity * item.price).toFixed(2)}</Text>
                <Button onClick={() => removeProduct(item)} colorScheme="red" width="100%">
                  <Icon as={FaTrash} />
                </Button>
              </Stack>
            </Box>
          ))}
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Box>Subtotal: ${total.toFixed(2)}</Box>
            <Button onClick={() => {
              if(window.confirm('Are you sure?')) {
                clearCart()
              }
            }} colorScheme="red">Clear Cart</Button>
          </Flex>
          <Button onClick={() => push('/checkout')} colorScheme="linkedin">Proceed To Checkout</Button>
        </Stack>
      ) : (
        <Stack spacing={5}>
          <Text fontSize="20px">Cart's Empty</Text>
          <Button maxWidth="600px" colorScheme="orange" onClick={() => push('/shop')}>Return To Shop</Button>
        </Stack>
      )}
      </Stack>
    </Layout>
  )
}

export default withRouter(CartPage)