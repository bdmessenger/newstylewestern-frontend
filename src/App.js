import { useContext } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from 'context/userContext'

import Header from 'components/Header'

import HomePage from 'pages/index'
import AboutPage from 'pages/about'
import ShopPage from 'pages/shop'
import ProductPage from 'pages/product'
import CartPage from 'pages/cart'
import SignInPage from 'pages/signin'
import SignUpPage from 'pages/signup'
import CheckoutPage from 'pages/checkout'
import SuccessPage from 'pages/success'
import CanceledPage from 'pages/canceled'
import NotFoundPage from 'pages/404'

const GuestRoute = (props) => {
  const { user } = useContext(UserContext)
  if(user) {
    return <Redirect to="/"/>
  }

  return <Route {...props} />
}

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/product/:id" component={ProductPage} />
        <GuestRoute path="/sign-in" component={SignInPage} />
        <GuestRoute path="/sign-up" component={SignUpPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/canceled" component={CanceledPage}/>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
