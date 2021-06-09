import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import CartContextProvider from 'context/cartContext'
import ProductsContextProvider from 'context/productsContext'
import UserContextProvider from 'context/userContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import App from './App';

const theme = extendTheme({
  fonts: {
    heading: "'Fira Sans', sans-serif",
    body: "'Fira Sans', sans-serif",
  }
})

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

ReactDOM.render(
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ProductsContextProvider>
          <CartContextProvider>
            <Elements stripe={stripePromise}>
              <UserContextProvider>
                <App />
              </UserContextProvider>
            </Elements>
          </CartContextProvider>
        </ProductsContextProvider>
      </ChakraProvider>
    </HelmetProvider>,
  document.getElementById('root')
);
