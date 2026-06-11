// lembrar o professor do to-do no começo do código

class Item {
    constructor(public title: string) { }
}

class TodoList { //updated

    private items: Promise<Item[]>
    private filePath: string

     constructor(filePath: string) {
        this.filePath = filePath
        this.items = this.readListFromDisk()
  }

    private async saveListToDisk() {
        const file = Bun.file(this.filePath)
        const data = JSON.stringify(await this.items)
        await file.write(data)
  }

    private async readListFromDisk() {
        const file = Bun.file(this.filePath)
        // const text = await file.text()
        // const data = JSON.parse(text)
        const data = await file.json()
        const items: Item[] = data.map((v: any) => {
            return new Item(v.title)
        })
    return items
  }
  
    /**
     * Isso adiciona um novo item na lista de itens
     */
    async addItem(item: Item) {
        const items = await this.items
        if (!item) 
        throw 'item não pode ser nulo ou indefinido'
        if (!item.title || !item.title.trim()) 
        throw 'item.title não pode ser nulo ou indefinido'
        items.push(item)
        await this.saveListToDisk()
  }

    /**
     * Editar um item
     */
     async editItem(index: number, newTitle: string) {
        
        
        const items = await this.items;
        items.splice(index, 1, new Item(newTitle));
        await this.saveListToDisk();

     }


    /**
     * Remove um item da lista de item pelo índice
     */
    async removeItem(index: number) {
        const items = await this.items
        items.splice(index, 1)
        await this.saveListToDisk()
  }


    /**
     * Retorna uma cópia da lista de itens
     */
    async getItems() {
        const items = await this.items
        return Array.from(items)
    }
    
}


export default TodoList
export { Item, TodoList }
