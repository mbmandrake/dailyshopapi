const sql = require('mssql');
const banco = require('./banco');

function Usuario(){
    this.id = 0,
    this.nome = '',
    this.email = '',
    this.senha = '',
    this.telefone = '',
    this.cpf = '',
    this.idEndereco = 0,
    this.idGrupo = 0,
    this.ativo = 1
}

async function getListaUsuario(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_USUARIO AS ID, TX_NOME AS NOME, TX_EMAIL AS EMAIL, TX_SENHA AS SENHA, TX_TELEFONE AS TELEFONE, TX_CPF AS CPF, ID_ENDERECO AS ENDERECO, ID_GRUPO AS GRUPO, BL_ATIVO AS STATUS, DT_REGISTRO from USUARIO;'
    );

    return(result.recordset);
};

async function getListaUsuarioPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query(
        'SELECT ID_USUARIO AS ID, TX_NOME AS NOME, TX_EMAIL AS EMAIL, TX_SENHA AS SENHA, TX_TELEFONE AS TELEFONE, TX_CPF AS CPF, ID_ENDERECO AS ENDERECO, ID_GRUPO AS GRUPO, BL_ATIVO AS STATUS, DT_REGISTRO from USUARIO WHERE ID_USUARIO = ' + id
    );
    return(result.recordset[0]);
};

async function addUsuario(user){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('nome', sql.VarChar, user.nome)
    .input('email', sql.VarChar, user.email)
    .input('senha', sql.VarChar, user.senha)
    .input('telefone', sql.VarChar, user.telefone)
    .input('cpf', sql.VarChar, user.cpf)
    .input('idEndereco', sql.Int, user.idEndereco)
    .input('idGrupo', sql.Int, user.idGrupo)
    .input('ativo', sql.Bit, user.ativo)
    .query(
        'insert into USUARIO values (@nome, @email, @senha, @telefone, @cpf, @idEndereco, @idGrupo, @ativo, GETDATE());' + 
        'SELECT ID_USUARIO AS ID, TX_NOME AS NOME, TX_EMAIL AS EMAIL, TX_SENHA AS SENHA, TX_TELEFONE AS TELEFONE, TX_CPF AS CPF, ID_ENDERECO AS ENDERECO, ID_GRUPO AS GRUPO, BL_ATIVO AS STATUS, DT_REGISTRO FROM USUARIO WHERE ID_USUARIO = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateUsuario(user){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.VarChar, user.id)
    .input('nome', sql.VarChar, user.nome)
    .input('email', sql.VarChar, user.email)
    .input('senha', sql.VarChar, user.senha)
    .input('telefone', sql.VarChar, user.telefone)
    .input('cpf', sql.VarChar, user.cpf)
    .input('idEndereco', sql.Int, user.idEndereco)
    .input('idGrupo', sql.Int, user.idGrupo)
    .input('ativo', sql.Bit, user.ativo)
    .query(
        'update USUARIO set TX_NOME = @nome, TX_EMAIL = @email, TX_SENHA = @senha, TX_TELEFONE = @telefone, TX_CPF = @cpf, ID_ENDERECO = @idEndereco, ID_GRUPO = @idGrupo, BL_ATIVO = @ativo where ID_USUARIO = @id;' +
        'SELECT ID_USUARIO AS ID, TX_NOME AS NOME, TX_EMAIL AS EMAIL, TX_SENHA AS SENHA, TX_TELEFONE AS TELEFONE, TX_CPF AS CPF, ID_ENDERECO AS ENDERECO, ID_GRUPO AS GRUPO, BL_ATIVO AS STATUS, DT_REGISTRO FROM USUARIO WHERE ID_USUARIO = @id;'
    );

    return(result.recordset);
};

async function deleteUsuario(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT BL_ATIVO from USUARIO where ID_USUARIO = ' + id);

    if (result.recordset[0].BL_ATIVO){
        try{
           await pool.request().query('update USUARIO set BL_ATIVO = 0 where ID_USUARIO = ' + id);
        }   
        catch (error){
            console.log(error);
        }
    } 
    else{
        try{
            await pool.request().query('update USUARIO set BL_ATIVO = 1 where ID_USUARIO = ' + id);
         }   
         catch (error){
             console.log(error);
         }
    }
    
    return(result.recordset[0]);
};

module.exports.Usuario = Usuario;
module.exports.getListaUsuario = getListaUsuario;
module.exports.getListaUsuarioPorId = getListaUsuarioPorId;
module.exports.addUsuario = addUsuario;
module.exports.updateUsuario = updateUsuario;
module.exports.deleteUsuario = deleteUsuario;