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
            { path: '/admin/manage/products', name: 'Quản lý sản phẩm' }
        ]
    },
    {
        name: 'Đơn hàng',
        commands: [
            { path: '/admin/manage/orders', name: 'Quản lý đơn hàng' }
        ]
    },
    {
        name: 'Người dùng',
        commands: [
            { path: '/admin/manage/shops', name: 'Quản lý cửa hàng' },
            { path: '/admin/manage/customers', name: 'Quản lý người dùng' }
        ]
    },
    {
        name: 'Thông báo',
        commands: [
            { path: '/admin/manage/notifications', name: 'Quản lý thông báo' }
        ]
    },
    {
        name: 'Thống kê',
        commands: [
            { path: '/admin/dashboard', name: 'Thống kê dữ liệu' },
        ]
    },
    {
        name: 'Danh mục',
        commands: [
            { path: '/admin/manage/categories', name: 'Quản lý danh mục' }
        ]
    }
]