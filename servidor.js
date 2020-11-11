const express = require('express');
const bodyParser = require('body-parser');
const categoria = require('./categoria');
const grupo = require('./grupo');
const endereco = require('./endereco');
const produto = require('./produto');
const usuario = require('./usuario');
const lista = require('./lista');
const itemCompra = require('./itemCompra');

const servidor = express();

servidor.use(bodyParser.json());

//#region Categoria

servidor.get('/categoria', async (req,res) => {
    let lista = await categoria.getListaCategoria();
    res.json(lista);
});

servidor.get('/categoria/:id', async (req,res) => {
    let lista = await categoria.getListaCategoriaPorId(req.params.id);
    res.json(lista);
});

servidor.post('/categoria', async (req,res) => {
    let dados = req.body;

    let catego = new categoria.Categoria();
    catego.nome = dados.nome;
    catego.ativo = dados.ativo;

    res.json(await categoria.addCategoria(catego));
});

servidor.put('/categoria', async (req,res) => {
    let dados = req.body;

    let catego = new categoria.Categoria();
    catego.id = dados.id;
    catego.nome = dados.nome;
    catego.ativo = dados.ativo;

    res.json(await categoria.updateCategoria(catego));
});

servidor.delete('/categoria/:id', async (req,res) => {
    await categoria.deleteCategoria(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

//#region Grupo

servidor.get('/grupo', async (req,res) => {
    let lista = await grupo.getListaGrupo();
    res.json(lista);
});

servidor.get('/grupo/:id', async (req,res) => {
    let lista = await grupo.getListaGrupoPorId(req.params.id);
    res.json(lista);
});

servidor.post('/grupo', async (req,res) => {
    let dados = req.body;

    let grup = new grupo.Grupo();
    grup.nome = dados.nome;
    grup.descricao = dados.descricao;
    grup.ativo = dados.ativo;

    res.json(await grupo.addGrupo(grup));
});

servidor.put('/grupo', async (req,res) => {
    let dados = req.body;

    let grup = new grupo.Grupo();
    grup.id = dados.id;
    grup.nome = dados.nome;
    grup.descricao = dados.descricao;
    grup.ativo = dados.ativo;

    res.json(await grupo.updateGrupo(grup));
});

servidor.delete('/grupo/:id', async (req,res) => {
    await grupo.deleteGrupo(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

//#region Endereço

servidor.get('/endereco', async (req,res) => {
    let lista = await endereco.getListaEndereco();
    res.json(lista);
});

servidor.get('/endereco/:id', async (req,res) => {
    let lista = await endereco.getListaEnderecoPorId(req.params.id);
    res.json(lista);
});

servidor.post('/endereco', async (req,res) => {
    let dados = req.body;

    let end = new endereco.Endereco();
    end.rua = dados.rua;
    end.bairro = dados.bairro;
    end.cep = dados.cep;
    end.casa = dados.casa;
    end.uf = dados.uf;

    res.json(await endereco.addEndereco(end));
});

servidor.put('/endereco', async (req,res) => {
    let dados = req.body;

    let end = new endereco.Endereco();
    end.id = dados.id;
    end.rua = dados.rua;
    end.bairro = dados.bairro;
    end.cep = dados.cep;
    end.casa = dados.casa;
    end.uf = dados.uf;

    res.json(await endereco.updateEndereco(end));
});

//#endregion

//#region Produto

servidor.get('/produto', async (req,res) => {
    let lista = await produto.getListaProduto();
    res.json(lista);
});

servidor.get('/produto/:id', async (req,res) => {
    let lista = await produto.getListaProdutoPorId(req.params.id);
    res.json(lista);
});

servidor.post('/produto', async (req,res) => {
    let dados = req.body;

    let prod = new produto.Produto();
    prod.nome = dados.nome;
    prod.valor = dados.valor;
    prod.variacao = dados.variacao;
    prod.peso = dados.peso;
    prod.dimensao = dados.dimensao;
    prod.idCategoria = dados.idCategoria;
    prod.ativo = dados.ativo;

    res.json(await produto.addProduto(prod));
});

servidor.put('/produto', async (req,res) => {
    let dados = req.body;

    let prod = new produto.Produto();
    prod.id = dados.id;
    prod.nome = dados.nome;
    prod.valor = dados.valo;
    prod.variacao = dados.variacao;
    prod.peso = dados.peso;
    prod.dimensao = dados.dimensao;
    prod.categoria = dados.categoria;
    prod.ativo = dados.ativo;

    res.json(await produto.updateProduto(prod));
});

servidor.delete('/produto/:id', async (req,res) => {
    await produto.deleteProduto(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

//#region Usuario

servidor.get('/usuario', async (req,res) => {
    let lista = await usuario.getListaUsuario();
    res.json(lista);
});

servidor.get('/usuario/:id', async (req,res) => {
    let lista = await usuario.getListaUsuarioPorId(req.params.id);
    res.json(lista);
});

servidor.post('/usuario', async (req,res) => {
    let dados = req.body;

    let user = new usuario.Usuario();
    user.nome = dados.nome;
    user.email = dados.email;
    user.senha = dados.senha;
    user.telefone = dados.telefone;
    user.cpf = dados.cpf;
    user.idEndereco = dados.idEndereco;
    user.idGrupo = dados.idGrupo;
    user.ativo = dados.ativo;

    res.json(await usuario.addUsuario(user));
});

servidor.put('/usuario', async (req,res) => {
    let dados = req.body;

    let user = new usuario.Usuario();
    user.id = dados.id;
    user.nome = dados.nome;
    user.email = dados.email;
    user.senha = dados.senha;
    user.telefone = dados.telefone;
    user.cpf = dados.cpf;
    user.idEndereco = dados.idEndereco;
    user.idGrupo = dados.idGrupo;
    user.ativo = dados.ativo;

    res.json(await usuario.updateUsuario(user));
});

servidor.delete('/usuario/:id', async (req,res) => {
    await usuario.deleteUsuario(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

//#region Lista de Compra

servidor.get('/lista', async (req,res) => {
    let lista = await lista.getListaCompra();
    res.json(lista);
});

servidor.get('/lista/:id', async (req,res) => {
    let lista = await lista.getListaCompraPorId(req.params.id);
    res.json(lista);
});

servidor.post('/lista', async (req,res) => {
    let dados = req.body;

    let list = new lista.Lista();
    list.idUsuario = dados.idUsuario;
    list.valorTotal = dados.valorTotal;
    list.formaPagamento = dados.formaPagamento;
    list.statusPedido = dados.statusPedido;
    list.ativo = dados.ativo;

    res.json(await lista.addLista(list));
});

servidor.put('/lista', async (req,res) => {
    let dados = req.body;

    let list = new lista.Lista();
    list.id = dados.id;
    list.idUsuario = dados.idUsuario;
    list.valorTotal = dados.valorTotal;
    list.formaPagamento = dados.formaPagamento;
    list.statusPedido = dados.statusPedido;
    list.ativo = dados.ativo;

    res.json(await lista.updateLista(list));
});

servidor.delete('/lista/:id', async (req,res) => {
    await lista.deleteLista(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

//#region Item de Compra

servidor.get('/itemCompra', async (req,res) => {
    let lista = await itemCompra.getListaItemCompra();
    res.json(lista);
});

servidor.get('/itemCompra/:id', async (req,res) => {
    let lista = await usuario.getListaItemCompraPorId(req.params.id);
    res.json(lista);
});

servidor.post('/itemCompra', async (req,res) => {
    let dados = req.body;

    let compra = new itemCompra.ItemCompra();
    compra.idLista = dados.idLista;
    compra.idProduto = dados.idProduto;
    compra.valorProduto = dados.valorProduto;
    compra.qtdProduto = dados.qtdProduto;
    compra.valorTotal = dados.valorTotal;

    res.json(await itemCompra.addItemCompra(user));
});

servidor.put('/itemCompra', async (req,res) => {
    let dados = req.body;

    let compra = new itemCompra.ItemCompra();
    compra.id = dados.id;
    compra.idLista = dados.idLista;
    compra.idProduto = dados.idProduto;
    compra.valorProduto = dados.valorProduto;
    compra.qtdProduto = dados.qtdProduto;
    compra.valorTotal = dados.valorTotal;

    res.json(await itemCompra.updateItemCompra(compra));
});

servidor.delete('/itemCompra/:id', async (req,res) => {
    await itemCompra.deleteItemCompra(req.params.id);
    res.json('Status alterado com sucesso');
});

//#endregion

servidor.listen(8080,()=>{console.log('Rodando o Servidor');})