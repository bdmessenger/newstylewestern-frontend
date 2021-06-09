import { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { CartContext } from 'context/cartContext'
import { UserContext } from 'context/userContext'
import { useStripe } from '@stripe/react-stripe-js'
import { fetchFromAPI } from 'helpers'
import { Stack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'

const StripeCheckout = ({history: { push }}) => {
    const [email, setEmail] = useState('')
    const { cartItems } = useContext(CartContext)
    const { user } = useContext(UserContext)
    const stripe = useStripe()

    useEffect(() => {
        if(cartItems.length === 0) push('/shop')
    }, [cartItems, push])
    
    useEffect(() => {
        (async () => {
        if(user?.email) {
            const line_items = cartItems.map(item => ({
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.title,
                        description: item.description,
                        images: [item.color.image]
                    }
                }
            }))

            const response = await fetchFromAPI('create-checkout-session', {
                body: { line_items, customer_email: user.email }
            })

            const { sessionId } = response
            const { error } = await stripe.redirectToCheckout({
                sessionId
            })

            if (error) {
                console.log(error)
            }
        }})()
    }, [user, cartItems, stripe])

    const handleGuestCheckout = async e => {
        e.preventDefault()
        const line_items = cartItems.map(item => ({
            quantity: item.quantity,
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.color.image]
                }
            }
        }))

        const response = await fetchFromAPI('create-checkout-session', {
            body: { line_items, customer_email: email }
        })

        const { sessionId } = response
        const { error } = await stripe.redirectToCheckout({
            sessionId
        })

        if (error) {
            console.log(error)
        }
    }

    if(user?.email) {
        return <>Redirecting to shopping cart...</>
    }

    return (
        <form onSubmit={handleGuestCheckout}>
            <Stack maxWidth="700px" spacing={5}>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        required={true}
                        type='email'
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        value={email}
                    />
                </FormControl>
                <Button type='submit'>Continue To Checkout</Button>
            </Stack>
        </form>
    )
}

export default withRouter(StripeCheckout)