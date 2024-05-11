import { Rating, Box, Typography, Pagination, LinearProgress } from '@mui/material'
import CommentSection from './CommentSection/CommentSection'
import FilterReviews from './FilterReviews/FilterReviews'
function Reviews({ reviews, page, setPage, setSortType }) {
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    return (
        <Box sx={{ mb: 2, mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant='h5' color={'#444444'}>{reviews?.avg_rate}/5</Typography>
                    <Rating size='medium' value={reviews?.avg_rate || 0} precision={0.1} readOnly />
                    <Typography variant='subtitle2' color={'#444444'}>{(reviews?.total_rate_count || 0) + ' Đánh giá'}</Typography>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating size='small' value={5} readOnly />
                        <LinearProgress variant='determinate' color='warning' sx={{ height: 10, width: 100 }} value={50} />
                        <Typography variant='subtitle2' color={'#444444'}>{reviews?.five_star_rate_count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating size='small' value={4} readOnly />
                        <LinearProgress variant='determinate' color='warning' sx={{ height: 10, width: 100 }} value={50} />
                        <Typography variant='subtitle2' color={'#444444'}>{reviews?.four_star_rate_count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating size='small' value={3} readOnly />
                        <LinearProgress variant='determinate' color='warning' sx={{ height: 10, width: 100 }} value={50} />
                        <Typography variant='subtitle2' color={'#444444'}>{reviews?.three_star_rate_count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating size='small' value={2} readOnly />
                        <LinearProgress variant='determinate' color='warning' sx={{ height: 10, width: 100 }} value={50} />
                        <Typography variant='subtitle2' color={'#444444'}>{reviews?.two_star_rate_count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating size='small' value={1} readOnly />
                        <LinearProgress variant='determinate' color='warning' sx={{ height: 10, width: 100 }} value={50} />
                        <Typography variant='subtitle2' color={'#444444'}>{reviews?.one_star_rate_count}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 5 }}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>Đánh giá của người mua</Typography>
                <FilterReviews setSortType={setSortType}/>
            </Box>
            {reviews?.reviews?.content?.map((review, index) =>
                <CommentSection key={index} review={review} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 3, mb: 2 }}>
                <Pagination count={reviews?.reviews?.totalPages} showFirstButton showLastButton variant="outlined" color="primary" page={page} onChange={handleChangePage} />
            </Box>
        </Box>
    )
}

export default Reviews