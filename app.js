/*
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const checkoutPagseguroBtn = document.getElementById("checkout-pagseguro");

let cart = [];

cartBtn.addEventListener("click", function() {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function(event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function() {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function(event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        
    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
      </div>
    `;

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cartCounter.textContent = cart.length;
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
});

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal();
    }
}


addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
          Toastify({
            text: "Ops, a hamburgueria está fechada!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "black",
            },
        }).showToast();
        return;
    }

    if(cart.length ===0) return;
    if(addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressWarn.classList.remove("border-red-500")
        return;
    }

    const cartItems = cart.map((item) =>{
        return (
            '${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |'
        )
    
}) .join("")

  const message = encodeURIComponent(cartItems)
  const phone = ""

  window.open('https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}', "_blank")

  cart = [];
  updateCartModal();

})

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;

}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}

checkoutPagseguroBtn.addEventListener("click", async function() {
  // Verifique se há itens no carrinho e se o endereço está preenchido
  if (cart.length === 0 || addressInput.value === "") {
    alert("Carrinho vazio ou endereço não preenchido!");
    return;
  }

  // Dados do carrinho
  const cartItems = cart.map((item) => {
    return {
      id: item.name, // Você pode usar um ID real aqui
      description: item.name,
      amount: item.price.toFixed(2),
      quantity: item.quantity
    };
  });

  try {
    // Fazer uma requisição para gerar uma transação no backend
    const response = await fetch('https://seu-servidor.com/api/pagseguro/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: cartItems,
        address: addressInput.value,
        total: cartTotal.textContent
      })
    });

    const data = await response.json();
    
    if (data.code) {
      // Redireciona para o PagSeguro
      window.location.href = `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${data.code}`;
    } else {
      alert("Erro ao gerar a transação.");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
});

*/

const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const checkoutPagseguroBtn = document.getElementById("checkout-pagseguro");
const paymentModal = document.getElementById("payment-modal");
const cancelPaymentBtn = document.getElementById("cancel-payment-btn"); 
let cart = [];

// Abre o modal do carrinho ao clicar no botão
cartBtn.addEventListener("click", function() {
  updateCartModal();
  cartModal.style.display = "flex";
});

// Fecha o modal do carrinho ao clicar fora dele
cartModal.addEventListener("click", function(event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Fecha o modal do carrinho ao clicar no botão de fechar
closeModalBtn.addEventListener("click", function() {
  cartModal.style.display = "none";
});

// Adiciona itens ao carrinho quando o botão "Adicionar ao Carrinho" é clicado
menu.addEventListener("click", function(event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

// Atualiza o modal do carrinho com os itens e o total
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        
    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
      </div>
    `;

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cartCounter.textContent = cart.length;
}

// Remove itens do carrinho
cartItemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
});

// Função para remover itens do carrinho
function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal();
    }
}

// Valida o campo de endereço ao digitar
addressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

// Função para finalizar o pedido
checkoutBtn.addEventListener("click", function() {
    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
        Toastify({
            text: "Ops, a hamburgueria está fechada!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "black",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Atualiza o modal do carrinho e abre o modal de pagamento
    cartModal.style.display = "none"; // Fecha o modal do carrinho
    paymentModal.style.display = "flex"; // Abre o modal de pagamento
});

// Função para verificar se o restaurante está aberto
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

// Atualiza a exibição do status do restaurante
const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}

// Evento para finalizar o pagamento via PagSeguro
checkoutPagseguroBtn.addEventListener("click", async function() {
    // Verifica se há itens no carrinho e se o endereço está preenchido
    if (cart.length === 0 || addressInput.value === "") {
        alert("Carrinho vazio ou endereço não preenchido!");
        return;
    }

    // Dados do carrinho
    const cartItems = cart.map((item) => {
        return {
            id: item.name, // Você pode usar um ID real aqui
            description: item.name,
            amount: item.price.toFixed(2),
            quantity: item.quantity
        };
    });

    try {
        // Fazer uma requisição para gerar uma transação no backend
        const response = await fetch('http://localhost:3000/api/pagseguro/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems,
                address: addressInput.value
            })
        });

        const data = await response.json();
        
        if (data.code) {
            // Redireciona para o PagSeguro
            window.location.href = `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${data.code}`;
        } else {
            alert("Erro ao gerar a transação.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao processar pagamento. Tente novamente.");
    }
});

// Função para cancelar o pagamento e fechar o modal
cancelPaymentBtn.addEventListener("click", function() {
    paymentModal.style.display = "none"; // Fecha o modal de pagamento
});