import { Typography, Box, FormControl, MenuItem, Select, Tooltip } from '@mui/material'
import { RestartAlt } from '@mui/icons-material'

function Sort({ sort, setSort, handelReset }) {
    return (
        <Box className="flex">
            <Box className='flex flex-row items-center'>
                <Typography variant='body1' color={'#444444'}>Sắp xếp theo</Typography>
                <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                    <Select value={sort} onChange={(e) => setSort(e.target.value)} >
                        {sortList.map((sort, index) => (
                            <MenuItem key={index} color='#444444' value={sort?.value}>{sort?.lable}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box className="flex items-center gap-1">
                <Tooltip title="Đặt lại">
                    <RestartAlt className="text-3xl text-[#193744] cursor-pointer" onClick={handelReset} />
                </Tooltip>
            </Box>
        </Box>
    )
}

export default Sort

const sortList = [
    { value: 'DEFAULT', lable: 'Mặc định' },
    { value: 'TOP_SELLER', lable: 'Bán chạy nhất' },
    { value: 'NEWEST', lable: 'Mới nhất' },
    { value: 'PRICE_ASC', lable: 'Giá tăng dần' },
    { value: 'PRICE_DESC', lable: 'Giá giảm dần' }
]