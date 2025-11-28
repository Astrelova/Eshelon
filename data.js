// Данные для демонстрации
const giftData = {
    male: [
        {
            id: 1,
            name: "Умные часы",
            description: "Современные умные часы с отслеживанием активности, уведомлениями и длительной работой от батареи. Идеальный подарок для активного человека.",
            price: "12 990 ₽",
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "гаджеты"
        },
        {
            id: 2,
            name: "Набор для барбекю",
            description: "Полный набор для приготовления барбекю на природе или дома. Включает все необходимые инструменты премиум-класса.",
            price: "8 490 ₽",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "отдых"
        },
        {
            id: 3,
            name: "Беспроводные наушники",
            description: "Высококачественные беспроводные наушники с шумоподавлением и премиальным звуком. Работа до 30 часов без подзарядки.",
            price: "15 990 ₽",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "гаджеты"
        },
        {
            id: 4,
            name: "Электрическая зубная щетка",
            description: "Умная электрическая зубная щетка с таймером и несколькими режимами чистки для идеальной гигиены полости рта.",
            price: "6 790 ₽",
            image: "https://images.unsplash.com/photo-1594736797933-d0e6e4f6f8e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "здоровье"
        },
        {
            id: 5,
            name: "Набор инструментов",
            description: "Профессиональный набор инструментов для дома и ремонта. Включает более 100 предметов от проверенного бренда.",
            price: "11 290 ₽",
            image: "https://images.unsplash.com/photo-1572981779307-38f8b0456222?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "хобби"
        }
    ],
    female: [
        {
            id: 6,
            name: "Ювелирное украшение",
            description: "Элегантное колье из серебра с фианитами. Идеальный аксессуар для особого случая. Сертификат подлинности прилагается.",
            price: "9 990 ₽",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "украшения"
        },
        {
            id: 7,
            name: "Подарочный набор косметики",
            description: "Роскошный набор косметики от известного бренда. Включает средства для ухода за кожей и макияжа премиум-класса.",
            price: "7 490 ₽",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "красота"
        },
        {
            id: 8,
            name: "Ароматическая свеча",
            description: "Дизайнерская ароматическая свеча с нотами ванили и сандала. Создает уютную атмосферу в доме. Горение до 60 часов.",
            price: "2 990 ₽",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "дом"
        },
        {
            id: 9,
            name: "Электронная книга",
            description: "Современная электронная книга с подсветкой и большим объемом памяти. Идеально для любителей чтения. Защита от бликов.",
            price: "10 990 ₽",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "гаджеты"
        },
        {
            id: 10,
            name: "Йога-коврик премиум",
            description: "Профессиональный йога-коврик с антискользящим покрытием. Идеален для занятий йогой и фитнесом. Экологичные материалы.",
            price: "4 590 ₽",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "спорт"
        }
    ]
};

// Данные для демонстрации вишлиста
const demoWishes = [
    {
        name: "Книга 'Мастер и Маргарита'",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        link: "https://example.com/book"
    },
    {
        name: "Набор ароматических масел",
        image: "https://images.unsplash.com/photo-1603661682250-0c70f89c63b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        link: "https://example.com/oils"
    }
];

// Данные магазинов Краснодара
const krasnodarShops = [
    {
        id: 1,
        name: "Подарки от души",
        address: "ул. Красная, 123",
        products: ["кружка", "сувенир", "открытка"],
        lat: 45.0355,
        lng: 38.9753
    },
    {
        id: 2,
        name: "Сувенирная лавка",
        address: "ул. Северная, 45",
        products: ["кружка", "магнит", "блокнот"],
        lat: 45.0423,
        lng: 38.9678
    },
    {
        id: 3,
        name: "Магазин подарков 'Сюрприз'",
        address: "ул. Ленина, 67",
        products: ["кружка", "чехол", "плед"],
        lat: 45.0389,
        lng: 38.9721
    },
    {
        id: 4,
        name: "Эксклюзивные подарки",
        address: "пр. Чекистов, 12",
        products: ["кружка", "канцтовары", "украшения"],
        lat: 45.0334,
        lng: 38.9795
    },
    {
        id: 5,
        name: "Подарочная галерея",
        address: "ул. Гоголя, 89",
        products: ["кружка", "ваза", "картина"],
        lat: 45.0401,
        lng: 38.9742
    }
];