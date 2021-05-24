const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')

const Aluno = require('../model/Aluno')

/**
 * Obtem todos os alunos
 * GET /alunos 
 */

router.get('/',async(req,res)=>{
    try{
        const alunos = await Aluno.find({"estaAtivo":true}).sort({nome:1})
        res.json(alunos)
    } catch (err){
        res.status(500).send({
            errors:[{message: 'Não foi possivel obter a lista de alunos'}]
        })
    }
})

/**
 * Obtem um aluno pelo CPF
 * GET /alunos/:cpf
 */

 router.get('/:cpf',async(req,res)=>{
    try{
        const aluno = await Aluno.findOne({"cpf":req.params.cpf})
        if (aluno === null){
            aluno = {message:`Não foi foi encontrado um aluno com CPF: ${req.params.cpf}`}
        }
        res.json(aluno)
    } catch (err){
        res.status(500).send({
            errors:[{message: `Não foi possivel obter o aluno com CPF: ${req.params.cpf}`}]
        })
    }
})

/**
 * Inclui um novo aluno
 * POST /aluno 
 */

    const validaAluno=[
        check('nome','O nome do aluno é obrigatorio').not().isEmpty(),
        check('dataMatricula','A data da matricula é obrigatoria').not().isEmpty(),
        check('cpf','O cpf do aluno é obrigatorio').not().isEmpty(),
        //check('cpf','O nome do aluno é obrigatorio').not().equals('\d{3,3}\.\d{3,3}\.\d{3,3}-\d{2,2}')
    ]

 router.post('/',validaAluno,async(req,res)=>{
    const errors = validationResult(req)
    //let cpf
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {cpf} = req.body
    let aluno = await Aluno.findOne({cpf})
    if(aluno){
        return res.status(200).json({
            errors:[{message: 'este aluno ja foi cadastrado'}]
        })
    }
    try{
        let aluno = new Aluno(req.body)
        await aluno.save()
        res.send(aluno)
    } catch (err){
        return res.status(500).send({
            errors:[{message: 'Ocorreu um erro ao cadastrar o aluno'}]
        })
    }
})

/**
 * Remove um aluno pelo CPF
 * DELETE /alunos/:cpf
 */

 router.delete('/:cpf',async(req,res)=>{
    await Aluno.findOneAndDelete(req.params.cpf)
    .then(aluno => {
        res.send({message:`${aluno.cpf} removido com sucesso`})
    }).catch(err =>{
        return res.status(500).send({
            errors:[{message:'Não foi possivel remover o aluno'}]
        })
    })
})

/**
 * edita os dados de um aluno usando CPF
 * PUT /alunos/:cpf
 */

 router.put('/',validaAluno,async(req,res)=>{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    let dados = req.body
    await Aluno.findOneAndUpdate(req.body.cpf,{
        $set:dados
    },{new:true})
    .then(aluno =>{
        res.send({message:`${aluno.cpf} alterado com sucesso`})
    }).catch(err=>{
        return res.status(500).send({
            errors:[{message:'Não foi possivel alterar as informações do aluno'}]
        })
    })
})

module.exports = router