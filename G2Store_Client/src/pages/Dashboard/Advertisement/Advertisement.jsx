import { Box, Button, IconButton, Typography } from '@mui/material'
import { Visibility, ShoppingCart, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { useState } from 'react'
import { mockData } from '../../../apis/mockdata'

function Advertisement() {
  const [index, setIndex] = useState(0)
  const promotions = mockData.promotions
  return (
    <Box className='relative w-full max-h-screen'>
      <img src={promotions[index]?.image} alt='product' className='w-full h-full object-fill brightness-50' />
      <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 flex flex-col items-center'>
        <Typography variant={'h3'} sx={{
          color: 'white', fontWeight: 'bold',
          fontFamily: 'Rubik Vinyl, cursive', width: '400px', textAlign: 'center'
        }}>{promotions[index]?.name}</Typography>
        <Box className='opacity-80  gap-2 flex-row flex '>
          <Button variant="contained" startIcon={<Visibility sx={{ color: 'black' }} />}
            sx={{ bgcolor: 'white', color: 'black', fontWeight: 'bold', ':hover': { bgcolor: 'gray' } }}>Xem
          </Button>
          <Button variant="contained" startIcon={<ShoppingCart />}
            sx={{ color: 'white', border: 'none', backgroundColor: '#1C1C1C', fontWeight: 'bold', minWidth: '200px', ':hover': { bgcolor: 'gray' } }}>
            Thêm vào giỏ</Button>
        </Box>
      </Box>
      {index > 0 && <IconButton
        sx={{ ...useStyles.btnNextPrev, left: '5%' }} onClick={() => { setIndex(index - 1) }}><ArrowBackIos /></IconButton>}
      {index < promotions.length - 1 && <IconButton
        sx={{ ...useStyles.btnNextPrev, left: '95%' }} onClick={() => { setIndex(index + 1) }}><ArrowForwardIos /></IconButton>}
    </Box>

  )
}

export default Advertisement

const useStyles = {
  btnNextPrev: {
    position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', opacity: 0.8, bgcolor: 'white'
  }
}
