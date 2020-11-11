const sql = require('mssql');
const banco = require('./banco');

function Produto(){
    this.id = 0,
    this.nome = '',
    this.valor = 0.0,
    this.variacao = '',
    this.peso = 0.0,
    this.dimensao = 0.0,
    this.idCategoria = 0,
    this.ativo = 1
}

async function getListaProduto(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_PRODUTO AS ID, TX_NOME AS NOME, VALOR_PRODUTO AS VALOR, TX_VARIACAO AS VARIACAO, PESO, DIMENSAO, ID_CATEGORIA AS CATEGORIA, BL_ATIVO AS STATUS, DT_REGISTRO from PRODUTO'
    );

    return(result.recordset);
};

async function getListaProdutoPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_PRODUTO AS ID, TX_NOME AS NOME, VALOR_PRODUTO AS VALOR, TX_VARIACAO AS VARIACAO, PESO, DIMENSAO, ID_CATEGORIA AS CATEGORIA, BL_ATIVO AS STATUS, DT_REGISTRO from PRODUTO WHERE ID_PRODUTO = ' + id
    );
    return(result.recordset[0]);
};

async function addProduto(produto){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('nome', sql.VarChar, produto.nome)
    .input('valor', sql.Numeric, produto.valor)
    .input('variacao', sql.VarChar, produto.variacao)
    .input('peso', sql.Numeric, produto.peso)
    .input('dimensao', sql.Numeric, produto.dimensao)
    .input('categoria', sql.Int, produto.idCategoria)
    .input('ativo', sql.Bit, produto.ativo)
    .query(
        'INSERT INTO PRODUTO VALUES (@nome, @valor, @variacao, @peso, @dimensao, @categoria, @ativo, GETDATE());' + 
        'SELECT ID_PRODUTO AS ID, TX_NOME AS NOME, VALOR_PRODUTO AS VALOR, TX_VARIACAO AS VARIACAO, PESO, DIMENSAO, ID_CATEGORIA AS CATEGORIA, BL_ATIVO AS STATUS, DT_REGISTRO FROM PRODUTO WHERE ID_PRODUTO = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateProduto(produto){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, produto.id)
    .input('nome', sql.VarChar, produto.nome)
    .input('valor', sql.Numeric, produto.valor)
    .input('variacao', sql.VarChar, produto.variacao)
    .input('peso', sql.Numeric, produto.peso)
    .input('dimensao', sql.Numeric, produto.dimensao)
    .input('categoria', sql.Int, produto.idCategoria)
    .input('ativo', sql.Bit, produto.ativo)
    .query(
        'update PRODUTO set TX_NOME = @nome, VALOR_PRODUTO = @valor, TX_VARIACAO = @variacao, PESO = @peso, DIMENSAO = @dimensao, ID_CATEGORIA = @categoria, BL_ATIVO = @ativo where ID_PRODUTO = @id;' +
        'SELECT ID_PRODUTO AS ID, TX_NOME AS NOME, VALOR_PRODUTO AS VALOR, TX_VARIACAO AS VARIACAO, PESO, DIMENSAO, ID_CATEGORIA AS CATEGORIA, BL_ATIVO AS STATUS, DT_REGISTRO FROM PRODUTO WHERE ID_PRODUTO = @id;'
    );

    return(result.recordset);
};

async function deleteProduto(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT BL_ATIVO from PRODUTO where ID_PRODUTO = ' + id);

    if (result.recordset[0].BL_ATIVO){
        try{
           await pool.request().query('update PRODUTO set BL_ATIVO = 0 where ID_PRODUTO = ' + id);
        }   
        catch (error){
            console.log(error);
        }
    } 
    else{
        try{
            await pool.request().query('update PRODUTO set BL_ATIVO = 1 where ID_PRODUTO = ' + id);
         }   
         catch (error){
             console.log(error);
         }
    }
    
    return(result.recordset[0]);
};

module.exports.Produto = Produto;
module.exports.getListaProduto = getListaProduto;
module.exports.getListaProdutoPorId = getListaProdutoPorId;
module.exports.addProduto = addProduto;
module.exports.updateProduto = updateProduto;
module.exports.deleteProduto = deleteProduto;