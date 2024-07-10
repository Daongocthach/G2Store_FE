const currentYear = new Date().getFullYear()
export const mockData = {
    years: [
        currentYear - 5,
        currentYear - 4,
        currentYear - 3,
        currentYear -2,
        currentYear -1,
        currentYear,
        currentYear + 1,
        currentYear + 2,
        currentYear + 3,
        currentYear + 4,
        currentYear + 5
    ],
    images: {
        G2Logo: 'https://firebasestorage.googleapis.com/v0/b/g2store-956cf.appspot.com/o/G2Logo.png?alt=media&token=9c11895c-dcd5-4660-9de4-f539374c07e6',
        avatarNull: 'https://firebasestorage.googleapis.com/v0/b/g2store-956cf.appspot.com/o/avatar.png?alt=media&token=78359aaf-5651-4c63-b72b-86e69f31716c',
        loginImage: 'https://firebasestorage.googleapis.com/v0/b/g2store-956cf.appspot.com/o/loginImage.jpg?alt=media&token=98e4f1cc-12f3-4346-ab4c-8b0f02ae425e',
    }
}
