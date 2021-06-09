import {
    // useState, 
    useContext
} from 'react'
import { Box, Stack, Heading } from '@chakra-ui/layout'
import Layout from 'components/Layout'
import StripeCheckout from 'components/stripe-checkout/StripeCheckout'
// import ShippingAddress from 'components/ShippingAddress'
import {CartContext} from 'context/cartContext'

export default function CheckoutPage() {
    const {itemCount, total} = useContext(CartContext)
    // const [shipping, setShipping] = useState(null)

    return (
        <Layout>
            <Box>
                <Stack marginBottom={12} spacing={4}>
                    <Heading as="h2" size="2xl">Checkout Summary</Heading>
                    <Heading as="h3" size="xl">Total Items: {itemCount}</Heading>
                    <Heading as="h4" size="lg">Amount to Pay: ${total.toFixed(2)}</Heading>
                </Stack>
                <StripeCheckout/>
                {/* <Box display={shipping ? 'none' : 'block'}>
                    <ShippingAddress setShipping={setShipping}/>
                </Box> */}
            </Box>
        </Layout>
    )
}
