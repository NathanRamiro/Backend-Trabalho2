const mongoose = require('mongoose')

const AlunoSchema = mongoose.Schema({
    nome:String,
    sobrenome:String,
    cpf:{
        type:String,
        unique:true,
        //match: "\d{3,3}\.\d{3,3}\.\d{3,3}\.-\d{2,2}"
    },
    estaAtivo: {
        type:Boolean,
        default:true
    },
    foto: {
        originalname: {type: String}, 
        path: {type: String},
        size: {type: Number}, 
        mimetype: {type: String}
    }
},{timestamps:true})

module.exports = mongoose.model('Aluno', AlunoSchema)

