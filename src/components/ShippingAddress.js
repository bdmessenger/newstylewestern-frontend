import { useFormik } from 'formik'
import { Button, Stack, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react'
import * as Yup from 'yup'

const ShippingSchema = Yup.object().shape({
    name: Yup.string()
    .min(10, 'Too Short!')
    .required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    address: Yup.string().min('10', 'Too Short!').required('Required')
})

export default function ShippingAddress({setShipping}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            address: ''
        },
        onSubmit: values => {
            console.log('values', values)
            setShipping(values)
        },
        validationSchema: ShippingSchema
    })

    return (
        <Stack spacing={6}>
            <Heading as='h4' size="lg">Shipping Address</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={6} maxW="50%">
                    <FormControl id="name">
                        <FormLabel>Full Name</FormLabel>
                        <Input 
                            type="text" 
                            name="name" 
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name}
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email" 
                            name="email" 
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email}
                    </FormControl>
                    <FormControl id="address">
                        <FormLabel>Address</FormLabel>
                        <Input 
                            type="text" 
                            name="address" 
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                        {formik.errors.address}
                    </FormControl>
                    <Button colorScheme="teal" size="lg" type="submit">
                        Continue
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}
