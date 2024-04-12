import Product from './Product/Product'
import { Button, Box } from '@mui/material'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

function ListProduct({ products }) {
    const [showMore, setShowMore] = useState(0)
    const xs = useMediaQuery('(max-width: 600px)')
    const sm = useMediaQuery('(max-width: 800px)')
    const md = useMediaQuery('(max-width: 1000px)')
    const lg = useMediaQuery('(max-width: 1300px)')
    const vlg = useMediaQuery('(max-width: 1500px)')
    const maxItemsToShow = xs ? 1 : (sm ? 2 : (md ? 3 : (lg ? 4 : (vlg ? 5 : 6))))
    return (
        <Box sx={{ gap: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button startIcon={<ArrowBackIos sx={{ color: 'gray' }} />} sx={{ visibility: showMore > 0 ? 'visible' : 'hidden' }}
                onClick={() => { setShowMore(showMore - maxItemsToShow) }}></Button>
            {products?.slice(showMore, showMore + maxItemsToShow).map(product => <Product key={product.id} product={product} />)}
            <Button startIcon={<ArrowForwardIos sx={{ color: 'gray' }} />} sx={{
                visibility: products?.length > showMore + maxItemsToShow ? 'visible' : 'hidden'
            }}
                onClick={() => { setShowMore(showMore + maxItemsToShow) }}></Button>
        </Box>
    )
}

export default ListProduct
