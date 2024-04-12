export function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)
}

export const sortByMaxPrice = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => b.price - a.price)
}
export const sortByMinPrice = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => a.price - b.price)
}