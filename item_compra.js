const sql = require('mssql');
const banco = require('./banco');

function ItemCompra(){
    this.id = 0,
    this.idLista = 0,
    this.idProduto = 0,
    this.valorProduto = 0.0,
    this.qtdProduto = 0,
    this.valorTotal = 0.0
}

async function getListaItemCompra(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_COMPRA AS ID, ID_LISTA AS LISTA, ID_PRODUTO AS PRODUTO, VALOR_PRODUTO, QTD_PRODUTO, VALOR_PRODUTO from ITEM_COMPRA;'
    );

    return(result.recordset);
};

async function getListaItemCompraPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_COMPRA AS ID, ID_LISTA AS LISTA, ID_PRODUTO AS PRODUTO, VALOR_PRODUTO, QTD_PRODUTO, VALOR_PRODUTO from ITEM_COMPRA WHERE ID_COMPRA = ' + id
    );
    return(result.recordset[0]);
};

async function addItemCompra(itemCompra){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('idLista', sql.Int, itemCompra.idLista)
    .input('idProduto', sql.Int, itemCompra.idProduto)
    .input('valorProduto', sql.VarChar, itemCompra.valorProduto)
    .input('qtdProduto', sql.Int, itemCompra.qtdProduto)
    .input('valorTotal', sql.Numeric, itemCompra.valorTotal)
    .query(
        'insert into ITEM_COMPRA values (@idLista, @idProduto, @valorProduto, @qtdProduto, @valorTotal);' + 
        'SELECT  ID_COMPRA AS ID, ID_LISTA AS LISTA, ID_PRODUTO AS PRODUTO, VALOR_PRODUTO, QTD_PRODUTO, VALOR_PRODUTO from ITEM_COMPRA WHERE ID_COMPRA = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateItemCompra(itemCompra){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, itemCompra.id)
    .input('idLista', sql.Int, itemCompra.idLista)
    .input('idProduto', sql.Int, itemCompra.idProduto)
    .input('valorProduto', sql.VarChar, itemCompra.valorProduto)
    .input('qtdProduto', sql.Int, itemCompra.qtdProduto)
    .input('valorTotal', sql.Numeric, itemCompra.valorTotal)
    .query(
        'update LISTA_PRODUTO set ID_USUARIO = @idUsuario, VALOR_TOTAL = @valorTotal, FORMA_PAGAMENTO = @formaPagamento, STATUS_PEDIDO = @statusPedido, BL_ATIVO = @ativo where ID_LISTA = @id;' +
        'SELECT ID_COMPRA AS ID, ID_LISTA AS LISTA, ID_PRODUTO AS PRODUTO, VALOR_PRODUTO, QTD_PRODUTO, VALOR_PRODUTO from ITEM_COMPRA WHERE ID_COMPRA = @id;'
    );

    return(result.recordset);
};

async function deleteItemCompra(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'DELETE ITEM_COMPRA WHERE ID_COMPRA = ' + id
    );
    
    return(result.recordset[0]);
};

module.exports.ItemCompra = ItemCompra;
module.exports.getListaItemCompra = getListaItemCompra;
module.exports.getListaItemCompraPorId = getListaItemCompraPorId;
module.exports.addItemCompra = addItemCompra;
module.exports.updateItemCompra = updateItemCompra;
module.exports.deleteItemCompra = deleteItemCompra;