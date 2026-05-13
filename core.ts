class Item {
    constructor(public title: string) {
    }
}

class TodoList {
private items: Item[] = [];
private filePath: string;

constructor(filePath: string) {
    this.filePath = filePath;
}

addItem(item: Item) {
this.items.push(item);
}

removeItem(index: number) {
    this.items.splice(index, 1);
}

getItems(): Item[]{
    return [...this.items];
}

}


//

const todoList = new TodoList('todos.json')

todoList.addItem(new Item("Wow"));
console.log(todoList.getItems())