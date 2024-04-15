import { Typography, Box, Divider, Paper, Chip, LinearProgress } from '@mui/material'
import { PersonPin } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import UpdateAddress from './FormAddress/UpdateAddress'
import addressApi from '../../../apis/addressApi'
import AddAddress from './FormAddress/AddAddress'
import DeleteAddress from './FormAddress/DeleteAddress'

function Address() {
  const [rerender, setRerender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState([])

  const fetchData = async () => {
    setLoading(true)
    addressApi.getAddresses()
      .then((response) => {
        setAddresses(response)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchData()
  }, [rerender])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' fontWeight={'bold'}>Địa chỉ nhận hàng</Typography>
        <AddAddress rerender={rerender} setRerender={setRerender} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!loading && addresses.map((address, index) => (
          <Paper key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <PersonPin sx={{ fontSize: 40, color: '#5D478B' }} />
              <Box p={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant='subtitle1' fontWeight={500} sx={{ color: '#444444' }}>{address?.receiver_name}</Typography>
                  <Typography variant='subtitle2' fontWeight={500} sx={{ color: '#444444' }}>{address?.receiver_phone_no}</Typography>
                  {address?.is_default && <Chip label='Mặc định' size='small' sx={{ color: 'red', bgcolor: '#fae8e9', fontWeight: 500 }} />}
                </Box>
                <Typography variant='body1'>
                  {address?.province ? (address?.order_receive_address + ', ' + address?.ward + ', ' + address?.district + ', ' + address?.province) : ''}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 2 }}>
              <UpdateAddress address={address} rerender={rerender} setRerender={setRerender} />
              <Divider orientation="vertical" flexItem />
              <DeleteAddress addressId={address?.address_id} rerender={rerender} setRerender={setRerender} />
            </Box>
          </Paper>
        ))}
        {loading && <LinearProgress color="secondary" sx={{ mt: 2 }}/>}
      </Box>

    </Box>
  )
}

export default Address