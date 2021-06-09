import { useState, useEffect, useContext } from 'react'
import { withRouter, Link as Redirect } from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import {FiMinus, FiPlus} from 'react-icons/fi'
import { ProductsContext } from 'context/productsContext'
import { CartContext } from 'context/cartContext'
import Layout from 'components/Layout'
import { Box, Grid, Image, Stack, Heading, Text, Link, Icon, Flex, Circle, Divider, Button, useToast  } from '@chakra-ui/react'

const sizeDescriptions = [
    'Small', 
    'Medium',
    'Large', 
    'X-Large'
]

const ProductPage = ({ match, history: { push }}) => {
    const { products } = useContext(ProductsContext)
    const { addProduct } = useContext(CartContext)
    const { id } = match.params
    const toast = useToast()

    const [product, setProduct] = useState(null)
    const [currentColorIndex, setCurrentColorIndex] = useState(0)
    const [currentSizeIndex, setCurrentSizeIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleAddCart = () => {
        addProduct({
            title: product.title,
            description: product.description,
            price: product.price,
            maxQuantity: product.quantity,
            quantity,
            color: product.colors[currentColorIndex],
            size: product.sizes[currentSizeIndex]
        })

        toast({
            position: "top-right",
            title: 'Item(s) Added To Cart',
            status: 'success',
            isClosable: true,
            duration: 4000
        })
    }

    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id))

        if (!product) {
            return push('/shop')
        }

        setProduct(product)
    }, [id, product, push, products])

    if (!product) return <></>

    const { title, price, description, colors, sizes, quantity: maxQuantity } = product


    return (
        <Layout title={title}>
            <Link as={Redirect} to="/shop"><Icon fontSize="20px" as={TiArrowBack}/> Go Back To Shop</Link>
            <Grid marginTop={6} gridGap="40px" templateColumns={{lg: 'repeat(2,1fr)'}}>
                <Image width={{base: '100%', sm:'80%', md: '50%', lg: '90%'}} src={colors[currentColorIndex].image} />
                <Stack spacing={6}>
                    <Heading>{title}</Heading>
                    <Text fontSize="25px">${price.toFixed(2)}</Text>
                    <Text>
                        Color:  <Text as="span" fontWeight="semibold">{colors[currentColorIndex].name}</Text>
                    </Text>
                    <Flex gridGap={5}>
                        {colors.map((color, i) => (
                            <Circle key={i} cursor="pointer" onClick={() => setCurrentColorIndex(i)} border={i === currentColorIndex ? '3px solid white' : ''} boxShadow={`0 0 0 ${i === currentColorIndex ? '3px' : '0'} ${color.hexCode}`} bg={color.hexCode} size="40px" />
                        ))}
                    </Flex>
                    <Divider/>
                    <Text>
                        Size:
                        {' '}
                        <Text as="span" fontWeight="semibold">
                            {sizeDescriptions[currentSizeIndex]}
                        </Text>
                    </Text>
                    <Flex gridGap={5}>
                        {sizes.map((size, i) => (
                            <Box
                                key={i}
                                userSelect="none" 
                                cursor="pointer" 
                                border={i === currentSizeIndex ? '1px solid black' : '1px solid #e9eae5'} 
                                py={2} 
                                px={3}
                                onClick={() => setCurrentSizeIndex(i)}
                            >
                                {size}
                            </Box>
                        ))}
                    </Flex>
                    <Divider/>
                    <Text>{description}</Text>
                    {
                        maxQuantity > 0 ? (
                            <>
                                <Flex>
                                    <Button onClick={() => setQuantity(state => {
                                        if(state > 1) state--
                                        return state
                                    })} border="none" borderRadius={0}>
                                        <Icon as={FiMinus} />
                                    </Button>
                                    <Text py={2} px={5}>{quantity}</Text>
                                    <Button onClick={() => setQuantity(state => {
                                        if(state < maxQuantity) state++
                                        return state
                                    })} border="none" borderRadius={0}>
                                        <Icon as={FiPlus} />
                                    </Button>
                                </Flex>
                                <Button onClick={handleAddCart} maxWidth={{md: '80%'}} _hover={{bg: '#caae7f'}} bg="#f1d19c">Add To Cart</Button>
                            </>
                        ) : (
                            <Text fontSize="30px">Out of Stock</Text>
                        )
                    }
                </Stack>
            </Grid>
        </Layout>
    )
}


export default withRouter(ProductPage)
