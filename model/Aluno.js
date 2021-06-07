const mongoose = require('mongoose')

const AlunoSchema = mongoose.Schema({
    nome:String,
    dataMatricula:String,
    curso:{
        type:String,
        enum:['ADS','Mecatronica','Eventos','Adm','Economia'],
        default:'ADS'
    },
    cpf:{
        type:String,
        unique:true,
    },
    status: {
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports = mongoose.model('alunos', AlunoSchema)

