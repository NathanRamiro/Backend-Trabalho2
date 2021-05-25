const mongoose = require('mongoose')

const AlunoSchema = mongoose.Schema({
    nome:String,
    dataMatricula:String,
    cpf:{
        type:String,
        unique:true,    //O Unique causa um erro estranho.
                        //quando voce tenta editar os dados de um
                        //doc que não seja o mais antigo o Mongoose joga
                        //um erro apontando que o campo tem que ser unico
                        //mesmo quando o Unique é falso

        //match: '\d{3,3}\.\d{3,3}\.\d{3,3}\.-\d{2,2}' 
    },
    estaAtivo: {
        type:Boolean,
        default:false
    },
    foto: {
        originalname: {type: String}, 
        path: {type: String},
        size: {type: Number}, 
        mimetype: {type: String}
    }
},{timestamps:true})

module.exports = mongoose.model('alunos', AlunoSchema)

