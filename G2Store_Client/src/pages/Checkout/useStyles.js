import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const useStyles = extendTheme({
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1,
        marginTop: 1
    },
    flexBoxPrice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2
    },
    titleAddress: { fontWeight: 'bold', color: 'gray', minWidth: '100px' },
    button: { bgcolor: '#EE3B3B', color: 'white', mt: 2, borderRadius: 2, alignItems: 'center', ':hover': { bgcolor: 'red' } },
    buttonVoucher: { bgcolor: '#EE7942', color: 'white', borderRadius: 2, alignItems: 'center', ':hover': { bgcolor: 'orange' } },
    radio: { height: '30px', width: '30px' }

})

export default useStyles
