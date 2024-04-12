import { Box, Button, Typography } from '@mui/material'
import { Visibility, ShoppingCart, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { useState } from 'react'
import { mockData } from '../../../apis/mockdata'

const color = (theme) => (theme.palette.mode === 'dark' ? '#898989' : '#E6E6FA')

const useStyles = {
  btnNextPrev: {
    position: 'absolute', bgcolor: 'white', color: 'black', fontWeight: 'bold', transform: 'translate(-50%, -50%)', top: '50%', opacity: 0.5,
    ':hover': { bgcolor: '#D3D3D3' }
  }
}

function Advertisement() {
  const [index, setIndex] = useState(0)
  const promotions = mockData.promotions
  return (
    <Box sx={{ width: '100%', height: (theme) => theme.webCustom.promotionBannerHeight, position: 'relative' }} >
      <Box sx={{ width: '100%', height: '100%', bgcolor: color, borderRadius: 5 }}>
        <img src={promotions[index]?.image} alt='product' style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(60%)' }} />
        <Typography variant={'h2'} sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold',
          fontFamily: 'Rubik Vinyl, cursive', width: '400px', textAlign: 'center'
        }}>{promotions[index]?.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', height: '40px', opacity: 0.8 }}>
        <Button variant="contained" startIcon={<Visibility sx={{ color: 'black' }} />}
          sx={{ bgcolor: 'white', color: 'black', fontWeight: 'bold' }}>View
        </Button>
        <Button variant="contained" startIcon={<ShoppingCart />}
          sx={{ color: 'white', border: 'none', backgroundColor: '#1C1C1C', fontWeight: 'bold', minWidth: '200px' }}>Add to Cart</Button>
      </Box>
      {index > 0 && <Button startIcon={<ArrowBackIos />}
        sx={{ ...useStyles.btnNextPrev, left: '5%' }} onClick={() => { setIndex(index - 1) }}></Button>}
      {index < promotions.length - 1 && <Button startIcon={<ArrowForwardIos />}
        sx={{ ...useStyles.btnNextPrev, left: '95%' }} onClick={() => { setIndex(index + 1) }}></Button>}
    </Box>

  )
}

export default Advertisement
