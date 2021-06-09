import { useContext } from 'react'
import { withRouter} from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import { Box, Flex, Heading, Link, Icon, Circle, Container, Spacer } from "@chakra-ui/react"
import { auth } from 'firebase/index'
import { CartContext } from 'context/cartContext'
import { UserContext } from 'context/userContext'

const Header = ({history: { push }, location: {pathname}}) => {
  const { cartItems } = useContext(CartContext)
  const { user } = useContext(UserContext)
  
  return (
    <Box position="relative" zIndex={10} bg={pathname !== '/' ? '#caae7f' : ''} w="100%" padding={4} color="white">
      <Container maxW="container.xl">
        <Flex alignItems="center" gridGap={2} flexDirection={{base: 'column', md: 'row'}}>
          <Heading cursor="pointer" onClick={() => push('/')} fontSize={{base: 'xl', lg: "2xl"}}>New Style Western</Heading>
          <Spacer/>
          <Flex fontSize={{base: '13px', md: "16px"}} alignItems="center" gridGap={8} width={{base: '100%', md: "80%"}}>
            <Flex as="nav" gridGap={{base: 4, md:10}} alignItems="center">
              <Link onClick={() => push('/')}>Home</Link>
              <Link onClick={() => push('/shop')}>Shop</Link>
              <Link onClick={() => push('/about')}>About</Link>
            </Flex>
            <Spacer/>
            <Flex alignItems="center" gridGap={5}>
              {
                user ? (
                  <Link onClick={async () => {
                    await auth.signOut()
                    push('/sign-in')
                  }}>Sign Out</Link>
                ) : (
                  <Link onClick={() => push('/sign-in')}>Sign In</Link>
                )
              }
              <Box cursor="pointer" position="relative" onClick={() => push('/cart')}>
                <Icon as={AiOutlineShopping} w={8} h={8}/>
                { cartItems.length !== 0 && (
                  <Circle top={-1} right={-2} fontSize="10px" fontWeight="semibold" size="20px" position="absolute"  bg="#645233" color="white">
                    {cartItems.reduce((totalCount, item) => totalCount += item.quantity, 0)}
                  </Circle>
                )}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default withRouter(Header)
