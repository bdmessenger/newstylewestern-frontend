import { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { CartContext } from 'context/cartContext'
import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react'

const SuccessCheckout = ({ history }) => {
    const { clearCart, cartItems } = useContext(CartContext)

    useEffect(() => {
        if (cartItems.length !== 0) clearCart()
    }, [clearCart, cartItems])

    return (
        <Stack spacing={5}>
            <Heading as="h1">Thank you for your order</Heading>
            <Text as="p">We are currently processing your order and 
            will send you a confirmation email shortly.
            </Text>
            <Box>
                <Button colorScheme="blue" onClick={() => history.push('/shop')}>Continue Shopping</Button>
            </Box>
        </Stack>
    )
}

export default withRouter(SuccessCheckout)