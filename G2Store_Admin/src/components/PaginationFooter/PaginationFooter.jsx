import { TableRow, TableFooter, TablePagination, TableCell } from '@mui/material'
import EmptyData from '../EmptyData/EmptyData'

function PaginationFooter({ isNotEmpty, content, totalElements, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
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
            <EmptyData content={content} />
          </TableCell>
        </TableRow>
      }
    </TableFooter>
  )
}

export default PaginationFooter