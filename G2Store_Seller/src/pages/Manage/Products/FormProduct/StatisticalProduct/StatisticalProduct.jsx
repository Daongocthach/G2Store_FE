import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Box, Tooltip, Grid, CircularProgress, Typography } from '@mui/material'
import { Assessment } from '@mui/icons-material'
import statisticApi from '../../../../../apis/statisticApi'
import LineChart from '../../../../Dashboard/Statistical/LineChart'
import CircleChart from '../../../../Dashboard/Statistical/CircleChart'
import { formatCurrency } from '../../../../../utils/price'

function StatisticalProduct({ product }) {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            statisticApi.getProductStatistic(product?.product_id)
                .then((response) => { setData(response) })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        if (product?.product_id)
            fetchData()
    }, [product?.product_id])
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Box>
            <Tooltip title='Xem thống kê'><Assessment sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }}
                onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xl'>
                <DialogContent >
                    <Box className='flex flex-row gap-2 items-center justify-center w-full'>
                        {<img src={product?.images[0]?.file_url} alt={product?.name}
                            style={{ width: '60px', height: '60px', borderRadius: 10 }} />}
                        <Box>
                            <Typography variant='subtitle2' color={'#444444'}>{product?.name}</Typography>
                            <Typography variant='body2'> Mã sản phẩm: #{product?.product_id}</Typography>
                            <Typography variant='body2'>{formatCurrency(product?.price)}</Typography>
                        </Box>
                    </Box>
                    <Grid container alignItems={'center'} spacing={3} >
                        < Grid item xs={12} sm={12} md={6} lg={6}>
                            <LineChart monthStatisticalRes={data?.month} isProduct={true} />
                        </Grid>
                        < Grid item xs={12} sm={12} md={6} lg={6}>
                            <CircleChart dayStatistical={data?.day} isProduct={true} />
                        </Grid>
                    </Grid>
                    {loading && <CircularProgress />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
export default StatisticalProduct