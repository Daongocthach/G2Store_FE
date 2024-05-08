export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Lấy tháng (01 đến 12)
    const day = String(d.getDate()).padStart(2, '0'); // Lấy ngày (01 đến 31)
    const hour = String(d.getHours()).padStart(2, '0'); // Lấy giờ (00 đến 23)
    const minute = String(d.getMinutes()).padStart(2, '0'); // Lấy phút (00 đến 59)
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function covertStringToDate(date_string) {
    var formatted_date = new Date(date_string).toLocaleString('en-GB', { timeZone: 'UTC' })
        .replace(/(\d{4}-\d{2}-\d{2}),\s(\d{2}:\d{2}:\d{2})/, '$1 $2')
    return formatted_date
}