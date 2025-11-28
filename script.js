// Основная логика приложения
class PresentoApp {
    constructor() {
        this.currentUser = {
            fullname: "Иванова Анна Сергеевна",
            email: "anna@example.com"
        };
        this.map = null;
        this.markers = [];
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupThemeSwitcher();
        this.setupWishlist();
        this.setupAISearch();
        this.setupGiftRecommendations();
        this.setupSurpriseBox();
        this.setupMap();
        this.setupEventListeners();
        
        // Загружаем начальные данные
        this.loadWishlist();
        this.updateGiftRecommendations();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(link.getAttribute('data-section'));
            });
        });
        
        // Кнопка профиля
        document.getElementById('profile-icon').addEventListener('click', () => {
            this.navigateToSection('profile');
        });
        
        // Кнопка "Начать поиск подарка" на главной
        document.querySelector('.start-btn').addEventListener('click', () => {
            this.navigateToSection('ai-search');
        });
    }

    setupThemeSwitcher() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const theme = btn.getAttribute('data-theme');
                document.body.className = theme + '-theme';
                
                // Обновляем рекомендации при смене темы
                if (document.getElementById('gifts').classList.contains('active')) {
                    this.updateGiftRecommendations();
                }
            });
        });
    }

    setupWishlist() {
        document.getElementById('add-wish').addEventListener('click', () => {
            const name = document.getElementById('wish-name').value;
            const image = document.getElementById('wish-image').value;
            const link = document.getElementById('wish-link').value;
            
            if (name && image && link) {
                this.addWishlistItem(name, image, link);
                
                // Очищаем поля
                document.getElementById('wish-name').value = '';
                document.getElementById('wish-image').value = '';
                document.getElementById('wish-link').value = '';
            } else {
                this.showAlert('Пожалуйста, заполните все поля');
            }
        });
    }

    setupAISearch() {
        document.getElementById('ai-search-btn').addEventListener('click', () => {
            const age = document.getElementById('recipient-age').value;
            const gender = document.getElementById('recipient-gender').value;
            const interests = document.getElementById('recipient-interests').value;
            const occasion = document.getElementById('occasion').value;
            const budget = document.getElementById('budget').value;
            
            if (age && interests && occasion && budget) {
                this.generateAISuggestions(age, gender, interests, occasion, budget);
            } else {
                this.showAlert('Пожалуйста, заполните все поля');
            }
        });
    }

    setupSurpriseBox() {
        document.querySelectorAll('.select-price').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const priceOption = e.target.closest('.price-option');
                const price = priceOption.getAttribute('data-price');
                this.selectSurpriseBox(price);
            });
        });
    }

    setupMap() {
        // Инициализация карты при переходе на вкладку
        document.querySelector('[data-section="map"]').addEventListener('click', () => {
            if (!this.map) {
                this.initMap();
            }
        });

        // Поиск на карте
        document.getElementById('search-on-map').addEventListener('click', () => {
            this.searchOnMap();
        });
    }

    setupEventListeners() {
        document.getElementById('save-profile').addEventListener('click', () => {
            this.currentUser.fullname = document.getElementById('fullname').value;
            this.currentUser.email = document.getElementById('email').value;
            this.showAlert('Профиль успешно сохранен!');
        });

        document.getElementById('order-btn').addEventListener('click', () => {
            const address = document.getElementById('delivery-address').value;
            const date = document.getElementById('delivery-date').value;
            
            if (address && date) {
                this.showAlert(`Заказ оформлен! Доставка по адресу: ${address} на ${date}`);
            } else {
                this.showAlert('Пожалуйста, заполните адрес и дату доставки');
            }
        });
    }

    navigateToSection(sectionId) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        if (sectionId !== 'profile') {
            document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        }
        document.getElementById(sectionId).classList.add('active');
        
        if (sectionId === 'gifts') {
            this.updateGiftRecommendations();
        }
    }

    addWishlistItem(name, image, link) {
        const wishlistContainer = document.getElementById('wishlist-container');
        
        const wishItem = document.createElement('div');
        wishItem.className = 'wishlist-item';
        wishItem.innerHTML = `
            <img src="${image}" alt="${name}" onerror="this.src='https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80'">
            <div class="wishlist-item-content">
                <h3>${name}</h3>
                <a href="${link}" target="_blank">Купить</a>
            </div>
        `;
        
        wishlistContainer.appendChild(wishItem);
        this.saveWishlist();
    }

    loadWishlist() {
        const wishlistContainer = document.getElementById('wishlist-container');
        wishlistContainer.innerHTML = '';
        
        demoWishes.forEach(wish => {
            this.addWishlistItem(wish.name, wish.image, wish.link);
        });
    }

    saveWishlist() {
        // В реальном приложении здесь будет сохранение на сервер
        console.log("Wishlist saved to server");
    }

    updateGiftRecommendations() {
        const giftsContainer = document.getElementById('gifts-container');
        giftsContainer.innerHTML = '';
        
        // Определяем текущую тему (для мужчин или женщин)
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const giftType = isDarkTheme ? 'male' : 'female';
        const gifts = giftData[giftType];
        
        gifts.forEach(gift => {
            const giftCard = document.createElement('div');
            giftCard.className = 'gift-card';
            giftCard.innerHTML = `
                <img src="${gift.image}" alt="${gift.name}">
                <div class="gift-card-content">
                    <h3>${gift.name}</h3>
                    <p>${gift.description}</p>
                    <div class="price">${gift.price}</div>
                    <button class="view-gift-btn" data-id="${gift.id}">Подробнее</button>
                </div>
            `;
            
            giftsContainer.appendChild(giftCard);
        });
        
        // Добавляем обработчики для кнопок "Подробнее"
        document.querySelectorAll('.view-gift-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const giftId = parseInt(e.target.getAttribute('data-id'));
                this.showGiftDetail(giftId);
            });
        });
    }

    showGiftDetail(giftId) {
        // Находим подарок по ID
        let gift = null;
        for (const type in giftData) {
            gift = giftData[type].find(g => g.id === giftId);
            if (gift) break;
        }
        
        if (gift) {
            // Заполняем данные
            document.getElementById('gift-detail-title').textContent = gift.name;
            document.getElementById('gift-detail-image').src = gift.image;
            document.getElementById('gift-detail-description').textContent = gift.description;
            document.getElementById('gift-detail-price').textContent = gift.price;
            
            // Показываем секцию с деталями подарка
            this.navigateToSection('gift-detail');
        }
    }

    generateAISuggestions(age, gender, interests, occasion, budget) {
        const aiResponse = document.getElementById('ai-response');
        const aiSuggestions = document.getElementById('ai-suggestions');
        
        // Показываем индикатор загрузки
        aiResponse.style.display = 'block';
        aiSuggestions.innerHTML = '<div class="loading"></div> Идет поиск подарков...';
        
        // Имитация задержки AI-поиска
        setTimeout(() => {
            // Очищаем предыдущие предложения
            aiSuggestions.innerHTML = '';
            
            // Определяем тему на основе пола
            const giftType = gender === 'male' ? 'male' : 'female';
            const gifts = giftData[giftType];
            
            // Фильтруем подарки по бюджету
            const filteredGifts = gifts.filter(gift => {
                const price = parseInt(gift.price.replace(/\D/g, ''));
                const userBudget = parseInt(budget);
                return price <= userBudget * 1.2 && price >= userBudget * 0.5;
            });
            
            // Выбираем подарки для демонстрации
            const suggestions = filteredGifts.length > 0 ? 
                filteredGifts.slice(0, 3) : 
                gifts.slice(0, 3);
            
            // Создаем предложения
            suggestions.forEach(gift => {
                const suggestion = document.createElement('div');
                suggestion.className = 'ai-suggestion';
                suggestion.innerHTML = `
                    <h4>${gift.name}</h4>
                    <p>${gift.description}</p>
                    <p class="price">${gift.price}</p>
                    <button class="view-gift-btn" data-id="${gift.id}">Подробнее</button>
                `;
                
                aiSuggestions.appendChild(suggestion);
            });
            
            // Добавляем обработчики для кнопок "Подробнее"
            document.querySelectorAll('.view-gift-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const giftId = parseInt(e.target.getAttribute('data-id'));
                    this.showGiftDetail(giftId);
                });
            });
            
            // Если подарков не найдено, показываем сообщение
            if (filteredGifts.length === 0) {
                aiSuggestions.innerHTML += `
                    <div class="ai-suggestion">
                        <p>Для указанного бюджета подходящих подарков не найдено. 
                        Попробуйте увеличить бюджет или изменить критерии поиска.</p>
                    </div>
                `;
            }
        }, 1500);
    }

    selectSurpriseBox(price) {
        this.showAlert(`Surprise Box за ${price} ₽ выбран! С вами свяжется наш менеджер для уточнения деталей.`);
    }

    initMap() {
        // Инициализация карты Leaflet
        this.map = L.map('map-container').setView([45.0355, 38.9753], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        // Добавляем маркеры магазинов
        this.addShopMarkers();
    }

    addShopMarkers() {
        // Очищаем существующие маркеры
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        // Добавляем новые маркеры
        krasnodarShops.forEach(shop => {
            const marker = L.marker([shop.lat, shop.lng])
                .addTo(this.map)
                .bindPopup(`
                    <b>${shop.name}</b><br>
                    ${shop.address}<br>
                    <small>Товары: ${shop.products.join(', ')}</small>
                `);
            this.markers.push(marker);
        });
    }

    searchOnMap() {
        const product = document.getElementById('search-product').value.toLowerCase();
        
        if (!product) {
            this.showAlert('Введите название товара для поиска');
            return;
        }
        
        if (!this.map) {
            this.initMap();
        }
        
        // Фильтруем магазины по товару
        const filteredShops = krasnodarShops.filter(shop => 
            shop.products.some(p => p.toLowerCase().includes(product))
        );
        
        if (filteredShops.length === 0) {
            this.showAlert('Магазины с таким товаром не найдены');
            return;
        }
        
        // Очищаем маркеры
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        // Добавляем маркеры для найденных магазинов
        filteredShops.forEach(shop => {
            const marker = L.marker([shop.lat, shop.lng])
                .addTo(this.map)
                .bindPopup(`
                    <b>${shop.name}</b><br>
                    ${shop.address}<br>
                    <small>Есть в наличии: ${product}</small>
                `)
                .openPopup();
            this.markers.push(marker);
        });
        
        // Центрируем карту на первом найденном магазине
        if (filteredShops.length > 0) {
            this.map.setView([filteredShops[0].lat, filteredShops[0].lng], 14);
        }
    }

    showAlert(message) {
        alert(message);
    }
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PresentoApp();
});