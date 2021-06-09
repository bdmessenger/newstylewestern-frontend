import {useHistory} from 'react-router-dom'
import { Box, Center, Heading, Flex, Button } from "@chakra-ui/react"
import ImageCover from 'images/cowboy-cover.jpeg'

export default function Hero() {
    const history = useHistory()

    return (
        <Box position="fixed" left={0} top={0}>
            <Center position="fixed" top={0} zIndex="3" width="100%" height="100%" color="white">
                <Flex flexDirection="column" alignItems="center" gridGap={10}>
                    <Heading as="h2" size="2xl" fontSize={{base: "40px", sm: '50px', md: '60px', lg: '50px'}} textAlign="center">Western hats reimagined for modern life.</Heading>
                    <Button onClick={() => history.push('/shop')} size="lg" _focus={{boxShadow: "none"}}  colorScheme="red">SHOP NOW</Button>
                </Flex>
            </Center>
            <Box position="fixed" background={`radial-gradient(circle, rgba(0,0,0,0.2413340336134454) 3%, rgba(0,0,0,0.4906337535014006) 100%), url(${ImageCover}) no-repeat center`} backgroundSize="cover" width="100%" height="100%" zIndex={2}/>
        </Box>
    )
}