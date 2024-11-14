const products = new Map([
    [1, {
        id: 1,
        name: "Poterie Marocaine",
        category: "Ceramic",
        price: 20.00,
        image: "./img/products/prod1.png",
        description: "Cette poterie marocaine authentique est fabriquée à la main par des artisans qualifiés utilisant des techniques traditionnelles transmises de génération en génération.",
        caracteristiques: [
            "Fait main par des artisans marocains",
            "Argile naturelle de haute qualité",
            "Motifs traditionnels authentiques",
            "Pièce unique",
            "Idéal pour la décoration ou l'utilisation quotidienne"
        ]
    }],
    [2, {
        id: 2,
        name: "Vase Traditionnel",
        category: "Ceramic",
        price: 25.00,
        image: "./img/products/prod2.png",
        description: "Vase traditionnel marocain fait main avec des motifs géométriques complexes.",
        caracteristiques: [
            "Motifs géométriques traditionnels",
            "Finition émaillée",
            "Parfait pour la décoration d'intérieur",
            "Fait main",
            "Disponible en différentes tailles"
        ]
    }],
    [3, {
        id: 3,
        name: "Tapis Berbère",
        category: "Textile",
        price: 150.00,
        image: "./img/products/prod3.png",
        description: "Authentique tapis berbère tissé à la main avec des motifs traditionnels.",
        caracteristiques: [
            "Laine naturelle de haute qualité",
            "Tissage traditionnel berbère",
            "Motifs symboliques authentiques",
            "Fait entièrement à la main",
            "Pièce unique"
        ]
    }],
    [4, {
        id: 4,
        name: "Pouf en Cuir",
        category: "Leather",
        price: 45.00,
        image: "./img/products/prod4.png",
        description: "Pouf marocain en cuir véritable avec broderies traditionnelles.",
        caracteristiques: [
            "Cuir véritable",
            "Broderies artisanales",
            "Rembourrage confortable",
            "Design authentique",
            "Durable et résistant"
        ]
    }],
    [5, {
        id: 5,
        name: "Lanterne Marocaine",
        category: "Metal",
        price: 35.00,
        image: "./img/products/prod5.png",
        description: "Lanterne artisanale en métal avec des motifs découpés traditionnels.",
        caracteristiques: [
            "Métal travaillé à la main",
            "Motifs géométriques complexes",
            "Finition antique",
            "Parfait pour l'ambiance",
            "Installation facile"
        ]
    }],
    [6, {
        id: 6,
        name: "Coussin Brodé",
        category: "Textile",
        price: 30.00,
        image: "./img/products/prod6.png",
        description: "Coussin décoratif avec broderies traditionnelles marocaines.",
        caracteristiques: [
            "Tissu de qualité supérieure",
            "Broderies faites main",
            "Motifs traditionnels",
            "Fermeture éclair cachée",
            "Lavable en machine"
        ]
    }],
    [7, {
        id: 7,
        name: "Tajine Décoratif",
        category: "Ceramic",
        price: 40.00,
        image: "./img/products/prod7.png",
        description: "Tajine décoratif peint à la main avec des motifs traditionnels.",
        caracteristiques: [
            "Céramique de haute qualité",
            "Peinture à la main",
            "Motifs traditionnels",
            "Usage décoratif",
            "Résistant et durable"
        ]
    }],
    [8, {
        id: 8,
        name: "Panier en Osier",
        category: "Basket",
        price: 28.00,
        image: "./img/products/prod8.png",
        description: "Panier traditionnel tressé à la main en osier naturel.",
        caracteristiques: [
            "Osier naturel",
            "Tressage traditionnel",
            "Multi-usage",
            "Durable",
            "Écologique"
        ]
    }]
]);
function changeMainImg(){
    const MainImg = document.getElementById("MainImg");
    const smallimg = document.getElementsByClassName("small-img");
    
    Array.from(smallimg).forEach((img)=>{
        img.addEventListener('click', ()=>{
            let tmpSrc = MainImg.src;
            MainImg.src = img.src;
            img.src = tmpSrc;
        })
    })
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadProductDetails() {
    const productDetails = document.querySelector('.single-pro-details');
    if (!productDetails) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if (!productId) return;
    
    const product = products.get(productId);
    if (!product) return;

    const children = productDetails.children;
    
    const mainImg = document.getElementById('MainImg');
    mainImg.src = product.image;
    
    children[0].textContent = product.name;
    children[1].textContent = `$${product.price}`;
    children[6].textContent = product.description;
    const addToCartBtn = productDetails.querySelector('button');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', AddToCart(productId));
    }
    
    const listItems = document.querySelector('.product-features ul').querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.textContent = product.caracteristiques[index];
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    } else if (window.location.pathname.includes('product_description.html')) {
        loadProductDetails();
    }
});
document.addEventListener('DOMContentLoaded',changeMainImg);

let cart = [];

function writeCartToCookie() {
    try {
        const cartString = JSON.stringify({ items: cart });
        document.cookie = `cart=${encodeURIComponent(cartString)};max-age=${7*24*60*60};path=/`;
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}


function readCartFromCookie() {
    try {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('cart='));
        
        if (cookieValue) {
            const cartData = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
            cart = cartData.items;
        } else {
            cart = [];
        }
    } catch (error) {
        console.error('Error reading cart:', error);
        cart = [];
    }
}
function AddToCart(ID) {
    return function() {
        const quantityInput = document.querySelector('.single-pro-details input[type="number"]');
        if (!quantityInput) {
            console.error('Quantity input not found');
            return;
        }
        
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
            alert('Please enter a valid quantity');
            return;
        }2
        
        const item = cart.find(product => product.id === ID);
        if(item) {
            item.quantity += quantity;
        } else {
            readCartFromCookie();
            cart.push({id: ID, quantity: quantity});
        }
        writeCartToCookie();
        alert('Product added to cart!');
    }
}

function loadCartPage() {
    const tBody = document.getElementById('productsCart');
    if (!tBody) return;
    
    readCartFromCookie()
    const emptyCartDiv = document.querySelector('.empty-cart');
    if (cart.length === 0 && emptyCartDiv) {
        emptyCartDiv.style.display = 'block';
        return;
    }

    tBody.innerHTML = '';
    cart.forEach(item => {
        const product = products.get(parseInt(item.id));
        if (!product) return;

        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td><button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="far fa-times-circle"></i></button></td>
            <td><img src="${product.image}" alt=""></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${(product.price * item.quantity).toFixed(2)}</td>
        `;
        tBody.appendChild(tableRow);
    });
    updateCartTotal();
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    writeCartToCookie();
    alert('Product removed from cart!');
    loadCartPage();
    window.location.reload();
}

function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(newQuantity);
        writeCartToCookie();
        loadCartPage();
    }
}
function updateCartTotal() {
    const subtotalElement = document.querySelector('#subtotal table tr:first-child td:last-child');
    const totalElement = document.querySelector('#subtotal table tr:last-child td:last-child');
    
    if (!subtotalElement || !totalElement) return;
    
    const subtotal = cart.reduce((total, item) => {
        const product = products.get(parseInt(item.id));
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
}