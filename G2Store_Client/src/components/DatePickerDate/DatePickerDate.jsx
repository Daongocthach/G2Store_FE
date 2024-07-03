import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'

export default function DatePickerDate({ label, isDateTime, dateRoot, setDateRoot }) {
  const [date, setDate] = useState(dateRoot ||null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem >
        {isDateTime ?
          <DateTimePicker value={date} onChange={setDate} label={label} slotProps={{
            openPickerIcon: { fontSize: 'small' },
            openPickerButton: { color: 'inherit' },
            textField: {
              variant: 'filled',
              focused: true,
              color: 'primary'
            }
          }} />
          :
          <DatePicker value={date} onChange={setDate} label={label} slotProps={{
            openPickerIcon: { fontSize: 'small' },
            openPickerButton: { color: 'inherit' },
            textField: {
              variant: 'filled',
              focused: true,
              color: 'primary'
            }
          }} />
        }
      </DemoItem>
    </LocalizationProvider>
  )
}
