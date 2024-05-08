export function covertStringToDate(date_string) {
    var formatted_date = new Date(date_string).toLocaleString('en-GB', { timeZone: 'UTC' })
        .replace(/(\d{4}-\d{2}-\d{2}),\s(\d{2}:\d{2}:\d{2})/, '$1 $2')
    return formatted_date
}

export function getCurrentTime() {
    const currentTime = new Date()
    const offsetMinutes = currentTime.getTimezoneOffset()
    const offsetHours = padZero(Math.abs(offsetMinutes / 60))
    const offsetSign = offsetMinutes >= 0 ? '-' : '+'
    const offsetString = `${offsetSign}${offsetHours}:00`

    return currentTime.toISOString().replace('Z', offsetString)
}

function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`
}
