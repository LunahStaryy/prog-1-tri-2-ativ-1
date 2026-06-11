// CLI: Command Line Interface

/* 
Outras maneiras de exportar: 

import xpto from './core'

import { Item as ItemApelido, TodoList as TodoListApelido } from './core'

import { Item, TodoList } from './core'

Todas essas maneiras funcionam :PP
*/

import TodoListApelido, { Item } from "./core"

const todolist = new TodoListApelido('todolist.json')

const params = process.argv // argv ;; comandos do terminal.
const command = params[2]


// lista — faltei no dia, copy+paste

if (command === 'list') {
    const items = await todolist.getItems()
    console.log('Lista:')
    
    // for (let index = 0; index < items.length; index++) {
    //     const item = items[index] as Item
    //     console.log(`${index}: ${item.title}`)
    // }

    items.forEach((item, index) => {
        console.log(`${index}: ${item.title}`)
    })

    process.exit(0)
}


// remove — faltei no dia, copy+paste

if (command === 'remove') {
    const indexStr = params[3]
    
    if (!indexStr) {
        console.error('Índice do item a ser removido não pode ser nulo ou vazio')
        process.exit(1)
    }

    const index = parseInt(indexStr)
    
    if (isNaN(index)) {
        console.error('Índice precisa ser um número:', indexStr)
        process.exit(1)
    }
    
    await todolist.removeItem(index)
    console.log('Item removido com sucesso:', index)
    process.exit(0)
}

//edit

if (command === 'update') {

    const indexStr = params[3] //logica : 3 parametro sendo o numero
    const value = params[4]    // e o quarto sendo o texto

    if (indexStr === undefined) { // para não bugar o bglh do parse
        console.error('Índice do item a ser removido não pode ser nulo ou vazio')
        process.exit(1)
    }

    if (value === undefined || value === null) {
        console.error('Valor do item não pode ser nulo ou vazio')
        process.exit(1)
    }

    const index = parseInt(indexStr)

    await todolist.editItem(index, value!)
    
    console.log(`Item editado com sucesso:`, value)
    process.exit(0)

}


// add

if (command === 'add') {

    const value = params[3]

    if (!value) {
        console.error('Valor do item não pode ser nulo ou vazio')
        process.exit(1)
    }

    try {
        await todolist.addItem(new Item(value))
    } catch (error) {
        console.error('Erro ao adicionar item:', error)
        process.exit(1)
    }
    
    console.log(`Item adicionado com sucesso:`, value)
    process.exit(0)

}


// unknown command

if (command)
    console.log(`Comando não reconhecido: ${command}`)

console.log(`Comandos disponíveis:
- add <item>: Adiciona um item à lista
- remove <index>: Remove um item da lista por indice
- update <index> <item>: Edita um item da lista por indice
- list: Lista os itens atuais
`)
