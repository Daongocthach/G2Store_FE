import { useState } from 'react'
import { Button, Menu, Box } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import ViewOrder from '../FormOrder/ViewOrder'
import PrintOrder from '../FormOrder/PrintOrder'
import CancelOrder from '../FormOrder/CancelOrder'
import TrackingOrder from '../FormOrder/TrackingOrder'
import ViewRefundImages from '../FormOrder/ViewRefundImages'
import NextOrder from '../FormOrder/NextOrder'

function MenuSelect({ order, reRender, setRerender }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div>
            <Button variant='contained' color='info' onClick={handleClick} endIcon={<KeyboardArrowDown />} >
                Lựa chọn
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <ViewOrder order={order} />
                {(order?.order_status === 'PACKED' || order?.order_status === 'DELIVERING') &&
                <Box>
                    <TrackingOrder order={order} />
                    <PrintOrder orderCode={order?.ghn_order_code}/>
                </Box>}
                {(order?.order_status === 'REFUNDING' || order?.order_status === 'REFUNDED') &&
                    <ViewRefundImages images={order?.refund_images} content={order?.refund_reason} />}
                {(order?.order_status === 'CONFIRMED' || order?.order_status === 'ORDERED' ||
                    order?.order_status === 'PACKED' || order?.order_status === 'DELIVERING') &&
                    <Box>
                        <NextOrder order={order} reRender={reRender} setReRender={setRerender} />
                        <CancelOrder orderId={order?.order_id} reRender={reRender} setReRender={setRerender} />
                    </Box>}
            </Menu>
        </div>
    )
}

export default MenuSelect