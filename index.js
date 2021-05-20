const express = require("express")
require('dotenv').config()

//InicializaMongoServer ./config/db

//Rotas da aplicação
//
//
//

//InicializaMongoServer()

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 4000

///*
app.use((req,res,next)=>{
    // '*' deve ser trocado pelo dominio do app em produção
    res.setHeader('Access-Control-Allow-Origin', '*')
    // '*' deve ser trocado pelos cabeçalhos que serão utilizados
    res.setHeader('Access-Control-Allow-Headers', '*')
    // '*' deve ser trocado pelo dominio do app em produção
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION,PATCH')
    next()
})
//*/
app.use(express.json())

app.get('/',(req,res) =>{
    const idiomas = req.headers['accept-language']
    res.json({
        mensagem:'API funcional',
        versao:'1.0.0',
        idiomas:idiomas
    })
})

app.use((req,res)=>{
    res.status(404).json({message:`${req.originalUrl} não existe`})
})

app.listen(PORT,(req,res)=>{
    console.log(`servidor iniciado na porta ${PORT}`)
})