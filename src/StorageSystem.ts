// 🔄 Multi-Type Storage System
// 📦 Create a system that can store and manage different types of data.
//
// 1. Implement a class `Storage<T, U>` that can store multiple types of data.
// 2. Implement a method `addItem` that stores a new item of a generic type.
// 3. Implement a method `removeItem` that removes an item by value.
// 4. Implement a method `getItems` that returns all stored items.
// 5. Implement a method `findItem` that searches for an item by a given property value.
// 6. Implement a method `updateItem` that updates an item by its property value.

class MyStorage<T, U> {
  items: (T | U)[] = []

  addItem(item: T | U): string {
    this.items.push(item)
    if (typeof item === 'object') {
      if ('name' in item) {
        return `User ${item.name} added.`
      }
    }
    return `${item} added to storage.`
  }

  getItems(): (T | U)[] {
    return this.items
  }

  removeItem(id: T): string {
    let removedItem = this.items.find((item) => item === id)
    this.items = this.items.filter((item) => item !== id)
    return `${removedItem} removed from storage.`
  }

  findItem<K extends keyof T>(prop: K, val: T[K]): (T | U) | undefined {
    let searchedItem = this.items.find((item) =>  typeof item === "object" && item !== null && prop in item && (item as T)[prop] === val
  );
    return searchedItem
  }
  

  updateItem<K extends keyof T>(prop: K, id: T[K], update: T): string {
    let updatedItemIndex = this.items.findIndex((item) => typeof item === 'object' && item !== null && prop in item && (item as T)[prop] === id)
    if (updatedItemIndex === -1) {
      return 'Item not found.'
    } else {
      this.items[updatedItemIndex] = update
      if (typeof update === "object" && update !== null && 'name' in update && typeof update.name === 'string') {
        return `${update.name} updated successfully.`
      }
    }
  }
}

// Test cases
const numberStrStorage = new MyStorage<number, string>();

console.log(numberStrStorage.addItem(10)); // "10 added to storage."
console.log(numberStrStorage.addItem(20)); // "20 added to storage."
console.log(numberStrStorage.getItems()); // [10, 20]
console.log(numberStrStorage.removeItem(10)); // "10 removed from storage."
console.log(numberStrStorage.getItems()); // [20]
console.log(numberStrStorage.addItem('bob'))

const userStorage = new MyStorage<{ id: number; name: string }, string>();

console.log(userStorage.addItem({ id: 1, name: "Alice" })); // "User Alice added."
console.log(userStorage.addItem({ id: 2, name: "Bob" })); // "User Bob added."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
console.log(userStorage.findItem("name", "Alice")); // { id: 1, name: "Alice" }
console.log(userStorage.updateItem("id", 1, { id: 1, name: "Alice Updated" })); // "Alice updated successfully."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice Updated" }, { id: 2, name: "Bob" }]
console.log(userStorage.addItem('bob')) // "bob added to storage."
console.log(userStorage.items) // [{ id: 1, name: "Alice Updated" }, { id: 2, name: "Bob" }, 'bob']