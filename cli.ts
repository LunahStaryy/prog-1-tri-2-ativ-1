// CLI : command line interface

const params = process.argv
const command = params[2]

if (command === 'add') {
    const value = params[3]
    console.log(`Aqui vai a lógica para adicionar um novo item : ${value}`)
    process.exit(0)
}
console.log("Não entrou em nenhum if :P")