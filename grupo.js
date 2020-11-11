const sql = require('mssql');
const banco = require('./banco');

function Grupo(){
    this.id = 0,
    this.nome = '',
    this.descricao = '',
    this.ativo = true
}

async function getListaGrupo(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_GRUPO AS ID, TX_NOME AS NOME, TX_DESCRICAO AS DESCRICAO, BL_ATIVO AS STATUS, DT_REGISTRO from GRUPO');

    return(result.recordset);
};

async function getListaGrupoPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_GRUPO AS ID, TX_NOME AS NOME, TX_DESCRICAO AS DESCRICAO, BL_ATIVO AS STATUS, DT_REGISTRO from GRUPO where ID_GRUPO = ' + id);

    return(result.recordset[0]);
};

async function addGrupo(grupo){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('nome', sql.VarChar, grupo.nome)
    .input('descricao', sql.VarChar, grupo.descricao)
    .input('ativo', sql.Bit, grupo.ativo)
    .query(
        'insert into GRUPO values(@nome, @descricao, @ativo, GETDATE());' + 
        'SELECT ID_GRUPO AS ID, TX_NOME AS NOME, TX_DESCRICAO AS DESCRICAO, BL_ATIVO AS STATUS, DT_REGISTRO FROM GRUPO WHERE ID_GRUPO = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateGrupo(grupo){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, grupo.id)
    .input('nome', sql.VarChar, grupo.nome)
    .input('descricao', sql.VarChar, grupo.descricao)
    .input('ativo', sql.Bit, grupo.ativo)
    .query(
        'update GRUPO set TX_NOME = @nome, TX_DESCRICAO = @descricao, BL_ATIVO = @ativo where ID_GRUPO = @id;' +
        'SELECT ID_GRUPO AS ID, TX_NOME AS NOME, TX_DESCRICAO AS DESCRICAO, BL_ATIVO AS STATUS, DT_REGISTRO FROM GRUPO WHERE ID_GRUPO = @id;'
    );

    return(result.recordset);
};

async function deleteGrupo(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT BL_ATIVO from GRUPO where ID_GRUPO = ' + id);

    if (result.recordset[0].BL_ATIVO){
        try{
           await pool.request().query('update GRUPO set BL_ATIVO = 0 where ID_GRUPO = ' + id);
        }   
        catch (error){
            console.log(error);
        }
    } 
    else{
        try{
            await pool.request().query('update GRUPO set BL_ATIVO = 1 where ID_GRUPO = ' + id);
         }   
         catch (error){
             console.log(error);
         }
    }
    
    return(result.recordset[0]);
};

module.exports.Grupo = Grupo;
module.exports.getListaGrupo = getListaGrupo;
module.exports.getListaGrupoPorId = getListaGrupoPorId;
module.exports.addGrupo = addGrupo;
module.exports.updateGrupo = updateGrupo;
module.exports.deleteGrupo = deleteGrupo;