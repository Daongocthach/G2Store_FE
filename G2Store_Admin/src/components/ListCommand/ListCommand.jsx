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
        name: 'Tài khoản',
        commands: [
            { path: '/admin/manage/sellers', name: 'Quản lý người bán' },
            { path: '/admin/manage/users', name: 'Quản lý người dùng' }
        ]
    },
    // {
    //     name: 'Trò chuyện',
    //     commands: [
    //         { path: '/admin/manage/chat', name: 'Chat' },
    //         { path: '/admin/manage/auto-chat', name: 'Trả lời tự động' }
    //     ]
    // },
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
    },
    // {
    //     name: 'Tài chính',
    //     commands: [
    //         { path: '/admin/dashboard', name: 'Thu nhập' },
    //         { path: '/admin/dashboard', name: 'Số dư tài khoản' }
    //     ]
    // }
]