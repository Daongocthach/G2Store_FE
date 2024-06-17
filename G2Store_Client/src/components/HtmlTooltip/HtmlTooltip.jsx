import { Typography, styled, Box } from '@mui/material'
import { ErrorOutline, ContentCopy } from '@mui/icons-material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { format } from 'date-fns'
import React from 'react'
import { useAlert } from '../ShowAlert/ShowAlert'
import { formatCurrency } from '../../utils/price'

function HtmlTooltip({ voucher }) {
    const triggerAlert = useAlert()
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    triggerAlert('Đã copy mã vào clipboard', false, false)
                })
                .catch((err) => {
                    console.log(err)
                    triggerAlert('Copy mã thất bại', true, false)
                })
        } else {
            triggerAlert('Copy mã thất bại', true, false)
        }
    }
    return (
        <TooltipHtml
            title={
                <React.Fragment>
                    <Box className='flex flex-col gap-1 p-5'>
                        <Box className='flex flex-row gap-2 items-center'>
                            <Typography fontSize={13} className='text-gray-700'>Mã: {voucher?.id} </Typography>
                            <ContentCopy sx={{ fontSize: 13 }} className='cursor-pointer text-gray-600' onClick={() => copyToClipboard(voucher?.id)} />
                        </Box>
                        <Typography fontSize={13} className='text-gray-700'>Tên Mã: {voucher?.name} </Typography>
                        <Typography fontSize={13} className='text-gray-700'>Còn lại: {voucher?.quantity} </Typography>
                        <Typography fontSize={13} className='text-gray-700'>HSD: {format(new Date(voucher?.end_date), 'yyyy/MM/dd')} </Typography>
                        <Typography fontSize={13} className='text-gray-700'>Điều kiện: </Typography>
                        <ul style={{ listStyleType: 'circle' }} className='font-normal text-sm ml-4 text-gray-600'>
                            <li >Giảm {voucher?.discount_type == 'PERCENTAGE' ? voucher?.reduce_percent +
                                '%' : formatCurrency(voucher?.reduce_price)}</li>
                            <li >Áp dụng cho sản phẩm của shop.</li>
                            <li >Giá trị đơn hàng từ: {formatCurrency(voucher?.min_spend)}</li>
                        </ul>
                    </Box>
                </React.Fragment>
            }
        >
            <ErrorOutline className='text-blue-700' sx={{ fontSize: 20 }} />
        </TooltipHtml>
    )
}

export default HtmlTooltip

const TooltipHtml = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9'
    }
}))