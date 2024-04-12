export const sortByMaxId = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => b.id - a.id)
}
export const sortByMinId = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => a.id - b.id)
}