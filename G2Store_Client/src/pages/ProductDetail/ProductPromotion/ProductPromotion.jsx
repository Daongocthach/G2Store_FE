import { useState } from 'react'
import { Box, Typography, Button, Popover } from '@mui/material'
import { NavigateNext, CheckCircleOutline, Receipt } from '@mui/icons-material'
import { mockData } from '../../../apis/mockdata'
import { formatCurrency } from '../../../utils/price'

function ProductPromotion() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box >
      <Button variant="contained" fullWidth startIcon={<CheckCircleOutline />} endIcon={<NavigateNext />} onClick={handleClick} color='success'
        sx={{ ':hover': { bgcolor: 'green' } }}> Xem các khuyến mãi đặc biệt</Button>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        {mockData.promotions.map((promotion, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 1, gap: 2 }}>
            <Receipt sx={{ fontSize: 25, color: '#444444' }} />
            <Box >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant='subtitle2' color={'#444444'} >{promotion?.name}: </Typography>
                <Typography color={'#cb1c22'} variant='subtitle1' fontWeight={'bold'} >{promotion?.discount_type == 'PERCENTAGE' ? promotion?.reduce_percent + '%' : formatCurrency(promotion?.reduce_price)}</Typography>
              </Box>
              <Typography color={'#444444'} variant='subtitle2' >Đơn tối thiểu: {formatCurrency(promotion?.min_spend)}</Typography>
              <Typography >{promotion?.start_date} - {promotion?.end_date}</Typography>
            </Box>
          </Box>
        ))}
      </Popover>
    </Box>
  )
}

export default ProductPromotion