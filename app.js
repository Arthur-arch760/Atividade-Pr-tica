// ARRAYS DE DADOS
let clientes = []
let pets = []
let produtos = []
let carrinho = []

// CLIENTE
function criarCliente() {
  const nomeInput = document.getElementById("clienteNome")
  const emailInput = document.getElementById("clienteEmail")
  const vipInput = document.getElementById("clienteVip")

  const nome = nomeInput.value.trim()
  const email = emailInput.value.trim()
  const vip = vipInput.checked

  if (nome === "") {
    alert("Nome inválido")
    return
  }

  if (!email.includes("@")) {
    alert("Email inválido")
    return
  }

  clientes.push({ nome, email, vip })

  nomeInput.value = ""
  emailInput.value = ""
  vipInput.checked = false

  renderClientes()
}

function renderClientes() {
  const listaClientes = document.getElementById("listaClientes")
  listaClientes.innerHTML = ""

  clientes.forEach(c => {
    let li = document.createElement("li")
    li.innerText = `${c.nome} - ${c.email}${c.vip ? " (VIP)" : ""}`
    listaClientes.appendChild(li)
  })
}

// PET
function cadastrarPet() {
  const nomeInput = document.getElementById("petNome")
  const tipoInput = document.getElementById("petTipo")
  const idadeInput = document.getElementById("petIdade")

  const nome = nomeInput.value.trim()
  const tipo = tipoInput.value.trim()
  const idade = parseInt(idadeInput.value)

  if (nome === "") {
    alert("Pet precisa de nome")
    return
  }

  if (isNaN(idade) || idade < 0) {
    alert("Idade inválida")
    return
  }

  pets.push({ nome, tipo, idade })

  nomeInput.value = ""
  tipoInput.value = ""
  idadeInput.value = ""

  renderPets()
}

function renderPets() {
  const listaPets = document.getElementById("listaPets")
  listaPets.innerHTML = ""

  pets.forEach(p => {
    let li = document.createElement("li")
    li.innerText = `${p.nome} (${p.tipo}, ${p.idade} anos)`
    listaPets.appendChild(li)
  })
}

// PRODUTOS
function criarProduto() {
  const nomeInput = document.getElementById("produtoNome")
  const precoInput = document.getElementById("produtoPreco")

  const nome = nomeInput.value.trim()
  const preco = parseFloat(precoInput.value)

  if (nome === "") {
    alert("Nome do produto inválido")
    return
  }

  if (isNaN(preco) || preco <= 0) {
    alert("Preço inválido")
    return
  }

  produtos.push({ nome, preco })

  nomeInput.value = ""
  precoInput.value = ""

  renderProdutos()
}

function renderProdutos() {
  const listaProdutos = document.getElementById("listaProdutos")
  const produtoSelect = document.getElementById("produtoSelect")

  listaProdutos.innerHTML = ""
  produtoSelect.innerHTML = ""

  produtos.forEach((p, i) => {
    let li = document.createElement("li")
    li.innerText = `${p.nome} - R$ ${p.preco.toFixed(2)}`
    listaProdutos.appendChild(li)

    let op = document.createElement("option")
    op.value = i
    op.innerText = `${p.nome} (R$ ${p.preco.toFixed(2)})`
    produtoSelect.appendChild(op)
  })
}

// CARRINHO
function adicionarCarrinho() {
  const produtoSelect = document.getElementById("produtoSelect")
  const index = produtoSelect.value

  if (index === "" || produtos[index] === undefined) {
    alert("Selecione um produto válido")
    return
  }

  let p = produtos[index]
  carrinho.push(p)

  renderCarrinho()
}

function removerCarrinho() {
  if (carrinho.length === 0) {
    alert("O carrinho está vazio")
    return
  }
  carrinho.shift()
  renderCarrinho()
}

function renderCarrinho() {
  const listaCarrinho = document.getElementById("listaCarrinho")
  listaCarrinho.innerHTML = ""

  carrinho.forEach(p => {
    let li = document.createElement("li")
    li.innerText = `${p.nome} - R$ ${p.preco.toFixed(2)}`
    listaCarrinho.appendChild(li)
  })

  calcularTotal()
}

// TOTAL
function calcularTotal() {
  let total = 0

  carrinho.forEach(p => {
    total += p.preco
  })

  if (total > 100) {
    total *= 0.9
  }

  document.getElementById("total").innerText = total.toFixed(2)

  return total
}

// FINALIZAR
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!")
    return
  }

  const totalCalculado = calcularTotal()
  alert("Compra finalizada! Total: R$ " + totalCalculado.toFixed(2))

  carrinho = []
  renderCarrinho()
}

// CARROSSEL
let slideIndex = 0

function nextSlide() {
  slideIndex++
  updateSlide()
}

function prevSlide() {
  slideIndex--
  updateSlide()
}

function updateSlide() {
  const slides = document.querySelector(".slides")
  const total = document.querySelectorAll(".slide").length

  if (slideIndex >= total) slideIndex = 0
  if (slideIndex < 0) slideIndex = total - 1

  slides.style.transform = "translateX(-" + slideIndex * 100 + "%)"
}

setInterval(nextSlide, 4000)