import { Typography, Box, Divider, Paper, LinearProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import Address from '../../../components/Address/Address'
import UpdateAddress from './FormAddress/UpdateAddress'
import addressApi from '../../../apis/addressApi'
import AddAddress from './FormAddress/AddAddress'
import DeleteAddress from './FormAddress/DeleteAddress'

function EditAddress() {
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
        <Typography variant='h6' fontWeight={'bold'} color={'#444444'}>Địa chỉ nhận hàng</Typography>
        <AddAddress rerender={rerender} setRerender={setRerender} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!loading && addresses.map((address, index) => (
          <Paper key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Address address={address}/>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 2 }}>
              <UpdateAddress address={address} rerender={rerender} setRerender={setRerender} />
              <Divider orientation="vertical" flexItem />
              <DeleteAddress addressId={address?.address_id} rerender={rerender} setRerender={setRerender} />
            </Box>
          </Paper>
        ))}
        {loading && <LinearProgress color="secondary" sx={{ mt: 2 }} />}
      </Box>

    </Box>
  )
}

export default EditAddress