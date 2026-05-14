/**
 * to do: getItems needs to awaid readFromDisk
 */


class Item {
    constructor(public title: string) {
    }
}

class TodoList {
    private itens: Item[] = [];
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.readListFromDisk()
    }

    private async saveListToDisk() {
        const file = Bun.file(this.filePath)
        const data = JSON.stringify(this.itens)
        await file.write(data)
    }


/** Ele pega o arquivo e transforma o arquivo em json. Depois, pega a lista simples, percorre por cada item e cria um objeto com todos os dados e os metodos, pra nova lista atualizada,
      sendo tipo um loop que copia a lista e adiciona algo mais*/
    private async readListFromDisk() {
    const file = Bun.file(this.filePath)
    const data = await file.json()
    /*  */
    this.itens = data.map((v : any) => {
        return new Item(v.title)
    })
    }

    /**
     * 
     * adiciona um novo item na lista de itens
     */
    async addItem(item: Item) {
        this.itens.push(item);
        await this.saveListToDisk()
    }
    /**
     * 
     * remove um item da lista de itens pelo indice
     */
    async removeItem(index: number) {
        this.itens.splice(index, 1);
        await this.saveListToDisk()
    }
    /**
     * 
     * retorna uma copia da lista de itens
     */
    getItems(): Item[] {
        return [...this.itens];
    }

}

