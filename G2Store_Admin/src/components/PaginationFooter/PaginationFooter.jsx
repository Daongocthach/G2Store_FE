import { Box, Typography, TableRow, TableFooter, TablePagination, TableCell } from '@mui/material'
import emptyOrder from '../../assets/img/empty-order.png'

function PaginationFooter({ isNotEmpty, totalElements, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  return (
    <TableFooter>
      {isNotEmpty ?
        <TableRow>
          <TablePagination
            colSpan={12}
            labelRowsPerPage={'Số lượng mỗi trang'}
            rowsPerPageOptions={[5, { value: totalElements, label: 'Tất cả' }]}
            count={totalElements}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
        :
        <TableRow >
          <TableCell colSpan={6}>
            <Box className='flex flex-col items-center justify-center'>
              <img src={emptyOrder} />
              <Typography variant='subtitle1' className='text-gray-600'>Bạn chưa có đơn hàng nào</Typography>
            </Box>
          </TableCell>
        </TableRow>
      }
    </TableFooter>
  )
}

export default PaginationFooter