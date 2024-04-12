export const mockData = {
    products: [
        {
            _id: 'product-id-01',
            name: 'Bánh gạo',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: [
                {
                    name: 'Thực phẩm'
                },
                {
                    name: 'Nước uống'
                },
                {
                    name: 'Dao cạo'
                }
            ],
            provider: 'MasanGroup',
            reviews: [
                {
                    _id: 'reviews-id-01',
                    comment: 'Bánh gạo ngon',
                    avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
                    name: 'thach'
                },
                {
                    _id: 'reviews-id-02',
                    comment: 'Bánh gạo dở',
                    avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
                    name: 'khánh'
                },
                {
                    _id: 'reviews-id-03',
                    comment: 'Bánh gạo ngon 123',
                    avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
                    name: 'thach'
                },
            ]
        },
        {
            _id: 'product-id-02',
            name: 'Chai nước',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Nước uống',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-03',
            name: 'Mì omachi',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Thực phẩm',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-04',
            name: 'Bóng đèn 10W',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ điện tử',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-05',
            name: 'Dao thái',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-06',
            name: 'Dao thái1',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-07',
            name: 'Dao thái2',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-08',
            name: 'Dao thái',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-09',
            name: 'Dao thái1',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
        {
            _id: 'product-id-010',
            name: 'Dao thái2',
            description: 'Pro MERN stack Course',
            price: 100000,
            image: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            category: 'Đồ gia dụng',
            provider: 'MasanGroup'
        },
    ],
    categories: [
        {
            _id: 'category-id-01',
            name: 'Đồ gia dụng'
        },
        {
            _id: 'category-id-02',
            name: 'Thực phẩm'
        },
        {
            _id: 'category-id-03',
            name: 'Nước uống'
        },
        {
            _id: 'category-id-04',
            name: 'Đồ điện tử'
        }

    ],
    promotions: [
        {
            _id: 'promotion-id-01',
            name: 'Omachi Sốt Spaghetty',
            image: 'https://cdn-www.vinid.net/2020/10/c82b07dc-c%C3%A1ch-n%E1%BA%A5u-m%C3%AC-omachi-ngon.jpg'
        },
        {
            _id: 'promotion-id-02',
            name: 'Hảo hảo Chua Cay',
            image: 'https://poongsankorea.vn/medias/e51/images/2022/07/1-goi-mi-hao-hao-bao-nhieu-calo-1-1.jpg'
        },
        {
            _id: 'promotion-id-03',
            name: 'Miến phú hương',
            image: 'https://cdn.fast.vn/tmp/20200919065808-mien-phu-huong-thit-heo-nau-mang-1.jpg'
        },
        {
            _id: 'promotion-id-04',
            name: 'Mì hải sản siêu cay',
            image: 'https://bizweb.dktcdn.net/100/345/470/products/4261222092-1974521184.jpg?v=1584683941813'
        }

    ],
    users: [
        {
            _id: 'user-id-01',
            fullname: 'Đào Ngọc Thạch',
            username: 'pemeoh1',
            email: 'thach752002@gmail.com',
            password: '12345',
            phone: '012345678',
            address: 'TPHCM',
            avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
            status: 0,
            role: 0
        },
        {
            _id: 'user-id-02',
            fullname: 'Trần Khánh',
            username: 'pemeoh2',
            email: 'khanh@gmail.com',
            password: '12345',
            phone: '012345678',
            address: 'TPHCM',
            avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
            status: 0,
            role: 0
        },
        {
            _id: 'user-id-03',
            fullname: 'Trần Duy',
            username: 'pemeoh3',
            email: 'duy@gmail.com',
            password: '12345',
            phone: '012345678',
            address: 'TPHCM',
            avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
            status: 0,
            role: 0
        },
        {
            _id: 'user-id-04',
            fullname: 'Lê Cường',
            username: 'pemeoh4',
            email: 'cuong@gmail.com',
            password: '12345',
            phone: '012345678',
            address: 'TPHCM',
            avatar: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png',
            status: 0,
            role: 0
        }

    ],
}
