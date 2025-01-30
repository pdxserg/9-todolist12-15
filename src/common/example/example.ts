// Строки
const stringArray = ["apple", "banana", "cherry"]
// const result1 = updateArray(stringArray, "banana") // ['apple', 'banana', 'cherry']
// const result2 = updateArray(stringArray, "date") // ['apple', 'banana', 'cherry', 'date']
//
// // Числа
// const numberArray = [1, 2, 3]
// const result3 = updateArray(numberArray, 2) // [1, 2, 3]
// const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]

// const updateArray = <T>(arr: T[], el: T) => {
//   return arr.map(() => el)
// }
function updateArray(arr: string[], el: string) {
  if (!arr.includes(el)) {
    return [...arr, el] // Добавляем элемент в конец, если его нет
  }
  return arr // Если элемент уже есть, возвращаем массив без изменений
}

updateArray(stringArray, "banana")
