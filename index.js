function container(produtos) {
  // Cria o container de produtos
  let cont = document.createElement('div')
  cont.classList.add('products-container')

  produtos.forEach(produto => {
    let items = document.createElement('div')
    items.classList.add('product-panel')
    items.id = `produto-${produto.id}` 

    let imagem = document.createElement('img')
    imagem.classList.add('product-image')
    imagem.src = produto.image

    let nome = document.createElement('div')
    nome.classList.add('product-name')
    nome.innerHTML = produto.title

    let preco = document.createElement('div')
    preco.classList.add('product-price')
    preco.innerHTML = '$ ' + produto.price

    let categoria = document.createElement('div')
    categoria.classList.add('product-category')
    categoria.innerHTML = produto.category

    let avaliacao = document.createElement('div')
    avaliacao.classList.add('product-rating')
    avaliacao.innerHTML = `Avaliação: ${produto.rating.rate} (${produto.rating.count})`

    // Botão de editar
    let editarBtn = document.createElement('button')
    editarBtn.classList.add('btn-editar')
    editarBtn.innerHTML = 'Editar'
    editarBtn.onclick = function () {
      editarProduto(produto.id)
    }

    // Botão de deletar
    let deletarBtn = document.createElement('button')
    deletarBtn.classList.add('btn-deletar')
    deletarBtn.innerHTML = 'Deletar'
    deletarBtn.onclick = function () {
      ocultarProduto(produto.id)
    }

    // Adiciona os elementos ao painel de produto
    items.appendChild(imagem)
    items.appendChild(nome)
    items.appendChild(preco)
    items.appendChild(avaliacao)
    items.appendChild(categoria)
    items.appendChild(editarBtn)  
    items.appendChild(deletarBtn) 

    cont.appendChild(items)
  })

  document.body.appendChild(cont)
}

// Função para ocultar o produto
function ocultarProduto(id) {
  const produtoPanel = document.querySelector(`#produto-${id}`)
  let desejaDel = confirm("Tem certeza que quer deletar esse item?")
  if(desejaDel === true){
    produtoPanel.style.display = 'none'
  }
}

// Função para editar o produto
function editarProduto(id) {
  const produtoPanel = document.querySelector(`#produto-${id}`)
  const nomeAtual = produtoPanel.querySelector('.product-name').innerHTML
  const precoAtual = produtoPanel.querySelector('.product-price').innerHTML
  const categoriaAtual = produtoPanel.querySelector('.product-category').innerHTML

  // Pré seta os nomes
  const nomeInput = document.createElement('input')
  nomeInput.value = nomeAtual

  const precoInput = document.createElement('input')
  precoInput.value = precoAtual

  const categoriaInput = document.createElement('input')
  categoriaInput.value = categoriaAtual

  const salvarBtn = document.createElement('button')
  salvarBtn.innerHTML = 'Salvar'

  const cancelarBtn = document.createElement('button')
  cancelarBtn.innerHTML = 'Cancelar'

  produtoPanel.querySelector('.product-name').innerHTML = ''
  produtoPanel.querySelector('.product-name').appendChild(nomeInput)

  produtoPanel.querySelector('.product-price').innerHTML = ''
  produtoPanel.querySelector('.product-price').appendChild(precoInput)

  produtoPanel.querySelector('.product-category').innerHTML = ''
  produtoPanel.querySelector('.product-category').appendChild(categoriaInput)

  const buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('edit-buttons')
  buttonsDiv.appendChild(salvarBtn)
  buttonsDiv.appendChild(cancelarBtn)

  produtoPanel.appendChild(buttonsDiv)

  salvarBtn.onclick = function () {
    produtoPanel.querySelector('.product-name').innerHTML = nomeInput.value
    produtoPanel.querySelector('.product-price').innerHTML = '$ ' + precoInput.value
    produtoPanel.querySelector('.product-category').innerHTML = categoriaInput.value
    buttonsDiv.remove()
  }

  cancelarBtn.onclick = function () {
    produtoPanel.querySelector('.product-name').innerHTML = nomeAtual
    produtoPanel.querySelector('.product-price').innerHTML = precoAtual
    produtoPanel.querySelector('.product-category').innerHTML = categoriaAtual
    buttonsDiv.remove()
  }
}

function criarProd(produtos){
  let titul = prompt('Digite o nome do produto')
  let precinho = prompt('Insira o preço')
  let cat = prompt('Defina a categoria')
  let caminho = prompt('Qual o caminho da imagem?')

  const novoProduto = {
    id: produtos.length + 1,
    title: titul,
    price: parseFloat(precinho),
    category: cat,
    image: caminho,
    rating: {
      rate: 0, 
      count: 0 
    }
  };

  produtos.push(novoProduto);

  //sem isso aqui os produtos aparecem duplicados
  document.querySelector('.products-container').remove()

  // Exibe a lista atualizada de produtos
  container(produtos);
}

// Carrega os produtos ao clicar no botão
function fakeStore() {
  document.querySelector('#prod').addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
      .then(resp => resp.json())
      .then(produtos => {
        container(produtos)

        // Cria o botão "Adicionar Produto"
        let criar = document.createElement('button')
        criar.innerHTML = 'Adicionar produto'
        criar.id = 'criarElemento'
        document.body.appendChild(criar)

        document.querySelector('#criarElemento').addEventListener('click', () => criarProd(produtos));
      })
  })
}

window.onload = fakeStore
