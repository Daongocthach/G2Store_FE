import { Box } from '@mui/material'
import { useState } from 'react'
import Command from './Command/Command'

export default function ListCommand({ open }) {
    const [selected, setSelected] = useState('')
    return (
        <Box sx={{ mt: 2, gap: 3 }}>
            {listButton.map((button, index) => (
                <Command key={index} button={button} open={open} selected={selected} setSelected={setSelected} />
            ))}
        </Box>
    )
}
const listButton = [
    {
        name: 'Sản phẩm',
        commands: [
            { path: '/seller/manage/add-product', name: 'Thêm sản phẩm' },
            { path: '/seller/manage/products', name: 'Quản lý sản phẩm' },
            { path: '/seller/manage/products', name: 'Banner trang sản phẩm' }
        ]
    },
    {
        name: 'Đơn hàng',
        commands: [
            { path: '/seller/manage/orders', name: 'Quản lý đơn hàng' },
            { path: '/seller/manage/orders', name: 'Quản lý vận chuyển' },
            { path: '/seller/manage/orders', name: 'Quản lý hoàn trả' },
            { path: '/seller/manage/reviews', name: 'Quản lý đánh giá' }
        ]
    },
    {
        name: 'Tài khoản',
        commands: [
            { path: '/seller/manage/sellers', name: 'Quản lý người bán' },
            { path: '/seller/manage/profile', name: 'Cài đặt tài khoản' },
            { path: '/seller/manage/profile', name: 'Thiết lập chat' }
        ]
    },
    {
        name: 'Khuyến mãi',
        commands: [
            { path: '/seller/manage/add-promotion', name: 'Thêm khuyến mãi' },
            { path: '/seller/manage/promotions', name: 'Quản lý khuyến mãi' }
        ]
    },
    {
        name: 'Trò chuyện',
        icon: 'ThumbsUpDown',
        commands: [
            { path: '/seller/chat', name: 'Chat' },
            { path: '/seller/auto-chat', name: 'Trả lời tự động' }
        ]
    },
    {
        name: 'Thống kê',
        icon: 'Equalizer',
        commands: [
            { path: '/', name: 'Thống kê dữ liệu' },
            { path: '/', name: 'Tình trạng vận hành' }
        ]
    },
    {
        name: 'Gian hàng',
        icon: 'AddHomeWork',
        commands: [
            { path: '/', name: 'Thiết kế gian hàng' }
        ]
    },
    {
        name: 'Tài chính',
        icon: 'Money',
        commands: [
            { path: '/', name: 'Thu nhập' },
            { path: '/', name: 'Số dư tài khoản' }
        ]
    }
]