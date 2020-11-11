const sql = require('mssql');
const banco = require('./banco');

function Lista(){
    this.id = 0,
    this.idUsuario = 0,
    this.valorTotal = 0.0,
    this.formaPagamento = '',
    this.statusPedido = '',
    this.ativo = 1
}

async function getListaCompra(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_LISTA AS ID, ID_USUARIO AS USUARIO, VALOR_TOTAL, FORMA_PAGAMENTO, STATUS_PEDIDO, BL_ATIVO AS STATUS, DT_REGISTRO from LISTA_PRODUTO;'
    );

    return(result.recordset);
};

async function getListaCompraPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_LISTA AS ID, ID_USUARIO AS USUARIO, VALOR_TOTAL, FORMA_PAGAMENTO, STATUS_PEDIDO, BL_ATIVO AS STATUS, DT_REGISTRO from LISTA_PRODUTO WHERE ID_LISTA = ' + id
    );
    return(result.recordset[0]);
};

async function addLista(lista){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('idUsuario', sql.Int, lista.idUsuario)
    .input('valorTotal', sql.Numeric, lista.valorTotal)
    .input('formaPagamento', sql.VarChar, lista.formaPagamento)
    .input('statusPedido', sql.VarChar, lista.statusPedido)
    .input('ativo', sql.Bit, lista.ativo)
    .query(
        'insert into LISTA_PRODUTO values (@idUsuario, @valorTotal, @formaPagamento, @statusPedido, @ativo, GETDATE());' + 
        'SELECT ID_LISTA AS ID, ID_USUARIO AS USUARIO, VALOR_TOTAL, FORMA_PAGAMENTO, STATUS_PEDIDO, BL_ATIVO AS STATUS, DT_REGISTRO from LISTA_PRODUTO WHERE ID_LISTA = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateLista(lista){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, lista.id)
    .input('idUsuario', sql.Int, lista.idUsuario)
    .input('valorTotal', sql.Numeric, lista.valorTotal)
    .input('formaPagamento', sql.VarChar, lista.formaPagamento)
    .input('statusPedido', sql.VarChar, lista.statusPedido)
    .input('ativo', sql.Bit, lista.ativo)
    .query(
        'update LISTA_PRODUTO set ID_USUARIO = @idUsuario, VALOR_TOTAL = @valorTotal, FORMA_PAGAMENTO = @formaPagamento, STATUS_PEDIDO = @statusPedido, BL_ATIVO = @ativo where ID_LISTA = @id;' +
        'SELECT ID_LISTA AS ID, ID_USUARIO AS USUARIO, VALOR_TOTAL, FORMA_PAGAMENTO, STATUS_PEDIDO, BL_ATIVO AS STATUS, DT_REGISTRO from LISTA_PRODUTO WHERE ID_LISTA = @id;'
    );

    return(result.recordset);
};

async function deleteLista(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT BL_ATIVO from LISTA_PRODUTO where ID_LISTA = ' + id);

    if (result.recordset[0].BL_ATIVO){
        try{
           await pool.request().query('update LISTA_PRODUTO set BL_ATIVO = 0 where ID_LISTA = ' + id);
        }   
        catch (error){
            console.log(error);
        }
    } 
    else{
        try{
            await pool.request().query('update LISTA_PRODUTO set BL_ATIVO = 1 where ID_LISTA = ' + id);
         }   
         catch (error){
             console.log(error);
         }
    }
    
    return(result.recordset[0]);
};

module.exports.Lista = Lista;
module.exports.getListaCompra = getListaCompra;
module.exports.getListaCompraPorId = getListaCompraPorId;
module.exports.addLista = addLista;
module.exports.updateLista = updateLista;
module.exports.deleteLista = deleteLista;