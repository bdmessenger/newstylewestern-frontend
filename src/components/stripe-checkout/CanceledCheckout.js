import { withRouter } from 'react-router-dom'
import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react'

const CanceledCheckout = ({ history }) => {
    return (
        <Stack spacing={5}>
            <Heading as="h1">Payment failed</Heading>
            <Text as="p">Payment was not successful</Text>
            <Box>
                <Button colorScheme="blue" onClick={() => history.push('/shop')}>Continue Shopping</Button>
            </Box>
        </Stack>
    )
}

export default withRouter(CanceledCheckout)