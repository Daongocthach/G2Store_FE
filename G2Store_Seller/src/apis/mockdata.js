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
    categories :[
        {
            'categoryId': 1,
            'name': 'Bột gà rán',
            'deleted': false,
            'childCategories': [
                {
                    'categoryId': 2,
                    'name': 'Bột bột gà rán châu phi',
                    'deleted': false,
                    'childCategories': [
                        {
                            'categoryId': 99,
                            'name': 'Bột bột gà rán châu phi Loại 1',
                            'deleted': false,
                            'childCategories': [],
                            'products': [
                            ]
                        },
                        {
                            'categoryId': 98,
                            'name': 'Bột bột gà rán châu phi Loại 2',
                            'deleted': false,
                            'childCategories': [],
                            'products': [
                            ]
                        }
                    ],
                    'products': [
                    ]
                }
            ],
            'products': []
        },
        {
            'categoryId': 3,
            'name': 'Bánh',
            'deleted': false,
            'childCategories': [
                {
                    'categoryId': 17,
                    'name': 'Bánh Poca',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 16,
                    'name': 'Snack Cua',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                }
            ],
            'products': []
        },
        {
            'categoryId': 4,
            'name': 'Gia vị',
            'deleted': false,
            'childCategories': [
                {
                    'categoryId': 8,
                    'name': 'Nước tương',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 11,
                    'name': 'Tương ớt',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 12,
                    'name': 'Tương cà',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 7,
                    'name': 'Nước mắm',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 6,
                    'name': 'Dầu ăn',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                }
            ],
            'products': []
        },
        {
            'categoryId': 5,
            'name': 'Bánh phồng tôm',
            'deleted': false,
            'childCategories': [
                {
                    'categoryId': 9,
                    'name': 'Bánh phồng cua',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 15,
                    'name': 'Bánh phồng mực',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 13,
                    'name': 'Bánh phồng ghẹ',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 10,
                    'name': 'Bánh chuối chiên',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                },
                {
                    'categoryId': 14,
                    'name': 'Bánh phồng sứa',
                    'deleted': false,
                    'childCategories': [],
                    'products': []
                }
            ],
            'products': []
        },
        {
            'categoryId': 22,
            'name': 'Di chuyển',
            'deleted': false,
            'childCategories': [
            ],
            'products': []
        },
        {
            'categoryId': 22,
            'name': 'Nhạc cụ',
            'deleted': false,
            'childCategories': [
            ],
            'products': []
        },
        {
            'categoryId': 22,
            'name': 'Đồ điện tử',
            'deleted': false,
            'childCategories': [
            ],
            'products': []
        },
    ]
}
