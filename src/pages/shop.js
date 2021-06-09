import { useContext} from 'react'
import { useHistory } from 'react-router-dom'
import Layout from 'components/Layout'
import { Flex, Grid, Box, Image, Text, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { ProductsContext } from 'context/productsContext'

export default function ShopPage() {
    const history = useHistory()
    const { products, setSortType } = useContext(ProductsContext)

    return (
        <Layout>
            <Flex marginBottom={4} fontWeight="semibold" justifyContent="space-between" alignItems="center">
                <Text>Items ({products.length})</Text>
                <Menu placement="bottom-end">
                    <MenuButton as={Button} colorScheme="orange">
                        Sort
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setSortType(1)}>Name, A-Z</MenuItem>
                        <MenuItem onClick={() => setSortType(2)}>Name, Z-A</MenuItem>
                        <MenuItem onClick={() => setSortType(3)}>Low to High Price</MenuItem>
                        <MenuItem onClick={() => setSortType(4)}>High to Low Price</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Grid templateColumns={{base: "repeat(2, 1fr)", lg: "repeat(3,1fr)", xl: "repeat(4, 1fr)"}} gap={6}>
                { products.map(product => (
                    <Box key={product.id}>
                        <Image onClick={() => history.push(`/product/${product.id}`)} cursor="pointer" _hover={{ transform: 'scale(1.05,1.05)'}} marginBottom={5} width="100%" backgroundColor="#f2eee9" src={product.colors[0].image} />
                        <Box fontWeight="semibold" textAlign={{base: 'center', md: 'start'}}>
                            <Text fontSize={['13px', '15px', '17px']}>{product.title}</Text>
                            <Flex flexDirection={{base: 'column', md: "row" }} justifyContent="space-between">
                                <Text>${product.price.toFixed(2)}</Text>
                                {product.quantity === 0 && <Text fontWeight="bold" fontStyle="italic">Out of Stock</Text>}
                            </Flex>
                        </Box>
                    </Box>
                )) }
            </Grid>
        </Layout>
    )
}
