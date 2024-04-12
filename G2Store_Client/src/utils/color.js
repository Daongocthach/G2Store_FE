const colors = [
    'red',
    'blue',
    'green',
    'orange',
    'brown',
    'pink',
    'yellow',
    '#EEE685',
    '#8B658B'
]

export function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}