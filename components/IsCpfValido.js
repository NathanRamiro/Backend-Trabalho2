/**
 * 
 * Recebe um CPF e retorna se o mesmo é valido
 * 
 * @param {String} cpf 
 * @returns Boolean
 */

function IsCpfValido(cpf){


    if (!cpf.match(/\d{3,3}\.\d{3,3}\.\d{3,3}-\d{2,2}/)){
        return false            
    }


    let numeros = cpf.replace(/[\.-]/g,"")
    let arrayNumeros = numeros.split('',numeros.length - 2)

    console.log(cpf)
    console.log(numeros)

    let validador1 = 0

    arrayNumeros.forEach((num,index)=>{
        validador1 += num * (index + 1)
    })
    
    validador1 = validador1 % 11 >= 10 
                 ? 0
                 : validador1 % 11

    arrayNumeros.push(validador1)

    let validador2 = 0

    arrayNumeros.forEach((num,index)=>{
        validador2 += num * index
    })

    validador2 = validador2 % 11 >= 10 
                 ? 0
                 : validador2 % 11

    arrayNumeros.push(validador2)

    let final = arrayNumeros.toString()
    console.log(final)
    final = final.replace(/,/g,'')

    console.log(final)
    console.log(cpf.replace(/[\.-]/g,""))

    return final === cpf.replace(/[\.-]/g,"")


}

module.exports = IsCpfValido

//export default IsCpfValido