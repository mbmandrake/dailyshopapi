const sql = require('mssql');
const banco = require('./banco');

function Endereco(){
    this.id = 0,
    this.rua = '',
    this.bairro = '',
    this.cep = '',
    this.casa = 0,
    this.uf = ''
}

async function getListaEndereco(){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_ENDERECO AS ID, TX_RUA AS RUA, TX_BAIRRO AS BAIRRO, TX_CEP AS CEP, NR_CASA AS CASA, UF from ENDERECO');

    return(result.recordset);
};

async function getListaEnderecoPorId(id){
    let pool = await sql.connect(banco.config);

    let result = await pool.request().query('SELECT ID_ENDERECO AS ID, TX_RUA AS RUA, TX_BAIRRO AS BAIRRO, TX_CEP AS CEP, NR_CASA AS CASA, UF from ENDERECO where ID_ENDERECO = ' + id);

    return(result.recordset[0]);
};

async function addEndereco(endereco){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('rua', sql.VarChar, endereco.rua)
    .input('bairro', sql.VarChar, endereco.bairro)
    .input('cep', sql.VarChar, endereco.cep)
    .input('casa', sql.Int, endereco.casa)
    .input('uf', sql.VarChar, endereco.uf)
    .query(
        'insert into ENDERECO values(@rua, @bairro, @cep, @casa, @uf);' + 
        'SELECT ID_ENDERECO AS ID, TX_RUA AS RUA, TX_BAIRRO AS BAIRRO, TX_CEP AS CEP, NR_CASA AS CASA, UF FROM ENDERECO WHERE ID_ENDERECO = @@IDENTITY;'
    );

    return(result.recordset[0]);
};

async function updateEndereco(endereco){
    let pool = await sql.connect(banco.config);

    let result = await pool.request()
    .input('id', sql.Int, endereco.id)
    .input('rua', sql.VarChar, endereco.rua)
    .input('bairro', sql.VarChar, endereco.bairro)
    .input('cep', sql.VarChar, endereco.cep)
    .input('casa', sql.Int, endereco.casa)
    .input('uf', sql.VarChar, endereco.uf)
    .query(
        'update ENDERECO set TX_RUA = @rua, TX_BAIRRO = @bairro, TX_CEP = @cep, NR_CASA = @casa, UF = @uf where ID_ENDERECO = @id;' +
        'SELECT ID_ENDERECO AS ID, TX_RUA AS RUA, TX_BAIRRO AS BAIRRO, TX_CEP AS CEP, NR_CASA AS CASA, UF FROM ENDERECO WHERE ID_ENDERECO = @id;'
    );

    return(result.recordset);
};

module.exports.Endereco = Endereco;
module.exports.getListaEndereco = getListaEndereco;
module.exports.getListaEnderecoPorId = getListaEnderecoPorId;
module.exports.addEndereco = addEndereco;
module.exports.updateEndereco = updateEndereco;