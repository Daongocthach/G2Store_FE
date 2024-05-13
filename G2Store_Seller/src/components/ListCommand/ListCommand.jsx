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
            { path: '/seller/manage/products', name: 'Quản lý sản phẩm' }
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
            { path: '/seller/manage/add-seller', name: 'Thêm người bán' },
            { path: '/seller/manage/sellers', name: 'Quản lý người bán' },
            { path: '/seller/shop-profile', name: 'Cài đặt tài khoản shop' },
            { path: '/seller/profile', name: 'Cài đặt tài khoản' }
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
            { path: '/seller/dashboard', name: 'Thống kê dữ liệu' },
            { path: '/seller/dashboard', name: 'Tình trạng vận hành' }
        ]
    },
    {
        name: 'Gian hàng',
        icon: 'AddHomeWork',
        commands: [
            { path: '/seller/manage/design-shop', name: 'Thiết kế gian hàng' },
            { path: '/seller/manage/categories', name: 'Thiết lập ngành hàng' }
        ]
    },
    {
        name: 'Tài chính',
        icon: 'Money',
        commands: [
            { path: '/seller/dashboard', name: 'Thu nhập' },
            { path: '/seller/dashboard', name: 'Số dư tài khoản' }
        ]
    }
]