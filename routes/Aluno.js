const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Aluno = require('../model/Aluno')
const IsCpfValido = require('../components/IsCpfValido')

/**
 * Obtem todos os alunos
 * GET /alunos 
 */

router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find({ "status": true }).sort({ nome: 1 })
        res.json(alunos)
    } catch (err) {
        res.status(500).send({
            errors: [{ message: 'Não foi possivel obter a lista de alunos' }]
        })
    }
})

/**
 * Obtem um aluno pelo CPF
 * GET /alunos/:cpf
 */

router.get('/:cpf', async (req, res) => {
    try {
        const aluno = await Aluno.findOne({ "cpf": req.params.cpf })
        if (aluno === null) {
            let aluno = { message: `Não foi foi encontrado um aluno com CPF: ${req.params.cpf}` }
            res.json(aluno)
        } else {
            res.json(aluno)
        }
    } catch (err) {
        res.status(500).send({
            errors: [{ message: `Não foi possivel obter o aluno com CPF: ${req.params.cpf}` }]
        })
    }
})

/**
 * Inclui um novo aluno
 * POST /aluno 
 */

const validaAluno = [
    check('nome', 'O nome do aluno é obrigatorio').not().isEmpty(),
    check('dataMatricula', 'A data da matricula é obrigatoria').not().isEmpty(),
    check('cpf', 'O cpf do aluno é obrigatorio').not().isEmpty(),
    // sei que tem como fazer validadores personalizados mas não fui a fundo no tema
]

router.post('/', validaAluno, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { cpf } = req.body
    if (!IsCpfValido(cpf)) {
        return res.status(400).json({
            errors: [{ message: 'O cpf do aluno não é valido' }]
        })
    }
    let aluno = await Aluno.findOne({ cpf })
    if (aluno) {
        return res.status(200).json({
            errors: [{ message: 'Este aluno ja foi cadastrado' }]
        })
    }
    try {
        let aluno = new Aluno(req.body)
        await aluno.save()
        res.send(aluno)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            
            errors: [{ message: 'Ocorreu um erro ao cadastrar o aluno' }]
        })
    }
})

/**
 * Remove um aluno pelo CPF
 * DELETE /alunos/:cpf
 */

router.delete('/:cpf', async (req, res) => {

    //let cpf = req.params.cpf

    await Aluno.findOneAndDelete({cpf:req.params.cpf})
        .then(aluno => {
            res.send({ message: `${aluno.cpf} removido com sucesso` })
        }).catch(err => {
            return res.status(500).send({
                errors: [{ message: 'Não foi possivel remover o aluno' }]
            })
        })
})

/**
 * edita os dados de um aluno usando CPF
 * PUT /alunos/:cpf
 */

router.put('/', validaAluno, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let aluno = await Aluno.findOne({cpf:req.body.cpf})
    console.log(aluno)
    let dados = req.body
    console.log(dados)
    await Aluno.findByIdAndUpdate(aluno._id, {
        $set: dados
    }, { new: true })
        .then(aluno => {
            res.send({ message: `${aluno.cpf} alterado com sucesso` })
        }).catch(err => {
            console.log(err.message)
            return res.status(500).send({
                errors: [{ message: 'Não foi possivel alterar as informações do aluno' }]
            })
        })
})

module.exports = router