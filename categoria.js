const sql = require('mssql');
const banco = require('./banco');

function Categoria(){
    this.id = 0,
    this.nome = '',
    this.ativo = true
}

async function getListaCategoria(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_CATEGORIA AS ID, TX_NOME AS NOME, BL_ATIVO AS STATUS, DT_REGISTRO from CATEGORIA');

    return(result.recordset);
};

async function getListaCategoriaPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_CATEGORIA AS ID, TX_NOME AS NOME, BL_ATIVO AS STATUS, DT_REGISTRO from CATEGORIA where ID_CATEGORIA = ' + id);

    return(result.recordset[0]);
};

async function addCategoria(categoria){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('nome', sql.VarChar, categoria.nome)
    .input('ativo', sql.Bit, categoria.ativo)
    .query(
        'insert into CATEGORIA values(@nome, @ativo, GETDATE());' + 
        'SELECT ID_CATEGORIA AS ID, TX_NOME AS NOME, BL_ATIVO AS STATUS, DT_REGISTRO FROM CATEGORIA WHERE ID_CATEGORIA = @@IDENTITY;'
    );
    
    return(result.recordset[0]);
};

async function updateCategoria(categoria){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, categoria.id)
    .input('nome', sql.VarChar, categoria.nome)
    .input('ativo', sql.Bit, categoria.ativo)
    .query(
        'update CATEGORIA set TX_NOME = @nome, BL_ATIVO = @ativo where ID_CATEGORIA = @id;' + 
        'SELECT ID_CATEGORIA AS ID, TX_NOME AS NOME, BL_ATIVO AS STATUS, DT_REGISTRO FROM CATEGORIA WHERE ID_CATEGORIA = @id;'
    );

    return(result.recordset[0]);
};

async function deleteCategoria(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT BL_ATIVO from CATEGORIA where ID_CATEGORIA = ' + id);

    if (result.recordset[0].BL_ATIVO){
        try{
           await pool.request().query('update CATEGORIA set BL_ATIVO = 0 where ID_CATEGORIA = ' + id);
        }   
        catch (error){
            console.log(error);
        }
    } 
    else{
        try{
            await pool.request().query('update CATEGORIA set BL_ATIVO = 1 where ID_CATEGORIA = ' + id);
         }   
         catch (error){
             console.log(error);
         }
    }
    
    return(result.recordset[0]);
};

module.exports.Categoria = Categoria;
module.exports.getListaCategoria = getListaCategoria;
module.exports.getListaCategoriaPorId = getListaCategoriaPorId;
module.exports.addCategoria = addCategoria;
module.exports.updateCategoria = updateCategoria;
module.exports.deleteCategoria = deleteCategoria;