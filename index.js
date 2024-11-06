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


function ocultarProduto(id) {
  let desejaDel = confirm("Tem certeza que quer deletar esse item?");
  if (desejaDel) {
    // Envia o pedido de exclusão para a API
    fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Produto deletado")
        // Remove o produto da interface
        const produtoPanel = document.querySelector(`#produto-${id}`)
        produtoPanel.style.display = "none"
        
      })
  }
}

function editarProduto(id) {
  const produtoPanel = document.querySelector(`#produto-${id}`)
  const nomeAtual = produtoPanel.querySelector('.product-name').innerHTML
  const precoAtual = produtoPanel.querySelector('.product-price').innerHTML.replace('$ ', '')
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
    const updatedProduct = {
      title: nomeInput.value,
      price: parseFloat(precoInput.value),
      category: categoriaInput.value,
    }

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
    .then(res => res.json())
    .then(updatedData => {
      alert("Produto atualizado com sucesso!")

      // Atualiza a interface com os novos valores
      produtoPanel.querySelector('.product-name').innerHTML = updatedData.title
      produtoPanel.querySelector('.product-price').innerHTML = '$ ' + updatedData.price
      produtoPanel.querySelector('.product-category').innerHTML = updatedData.category

      // Remove os botões da edição
      buttonsDiv.remove()
    })
  }

  cancelarBtn.onclick = function () {
    produtoPanel.querySelector('.product-name').innerHTML = nomeAtual
    produtoPanel.querySelector('.product-price').innerHTML = '$ ' + precoAtual
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
  }

  produtos.push(novoProduto)

  // Sem isso aqui os produtos aparecem duplicados
  document.querySelector('.products-container').remove()

  container(produtos)
}

function fakeStore() {
  // Cria os botões e seta os eventos
  const mostrarBtn = document.querySelector('#prod')

  const buttonContainer = document.createElement('div')
  buttonContainer.style.display = 'flex'
  buttonContainer.style.gap = '10px'
  buttonContainer.appendChild(mostrarBtn)

  const criarBtn = document.createElement('button')
  criarBtn.innerHTML = 'Adicionar produto'
  criarBtn.id = 'criarElemento'
  buttonContainer.appendChild(criarBtn)

  document.body.appendChild(buttonContainer)

  mostrarBtn.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
      .then(resp => resp.json())
      .then(produtos => {
        container(produtos)

        criarBtn.addEventListener('click', () => criarProd(produtos))
      })
  })
}

window.onload = fakeStore
