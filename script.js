class Task {
  constructor(text) {
    this.text = text
    this.isCompleted = false
  }
}

class ToDoList {
  constructor(selectedHtmlElement) {
    this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || []
    this.completed = []
    this.toBeDone = []
    this.searchedTask = ''
    this.foundTasks = []
    this.selectedHtmlElement = selectedHtmlElement || document.body
    this.render(this.tasks)
  }

  render(chosenTaskArray) {
    this.selectedHtmlElement.innerHTML = ''
    this.addPromptFormForAddingTasks()
    this.addSearchTaskButton()
    this.addFilteringButtons()
    this.addListWithTasks(chosenTaskArray)
  }

  addTaskToList(text) {
    if (text == '' || text == null) {
      alert("To byłoby dla Ciebie zbyt proste! Dodaj zadanie!")
    } else {
      this.tasks.push(new Task(text))
      this.saveTaskInLocalStorage()
    }
    this.render(this.tasks)
  }
  addListWithTasks(chosenTaskArray) {
    const ul = document.createElement('ul')
    ul.className = 'todo-list'
    chosenTaskArray.forEach((task, taskIndex) => {
      const li = document.createElement('li')
      const removeTaskButton = document.createElement('div')
      const removeIcon = document.createTextNode("\u00D7")

      li.classList.add('task')
      removeTaskButton.className = 'delete-task-button'

      li.addEventListener('click', (event) => {
        event.target.classList.add('task--completed')
        task.isCompleted = true
        this.saveTaskInLocalStorage()
      })

      removeTaskButton.addEventListener('click', () => {
        ul.removeChild(li)
        this.tasks = this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1, this.tasks.length))
        this.saveTaskInLocalStorage()
        this.render(this.tasks)
      })

      removeTaskButton.appendChild(removeIcon)
      li.innerText = task.text
      if (task.isCompleted) {
        li.style.textDecoration = "line-through"
        li.style.textDecorationColor = 'light-gray'
      }
      li.appendChild(removeTaskButton)
      ul.appendChild(li)
    })
    this.selectedHtmlElement.appendChild(ul)
  }

  addFilteringButtons() {
    const buttonAllTasks = document.createElement('button')
    const buttonCompletedTasks = document.createElement('button')
    const buttonTasksToBeDone = document.createElement('button')
    buttonAllTasks.innerText = 'Wszystkie'
    buttonCompletedTasks.innerText = 'Zrobione'
    buttonTasksToBeDone.innerText = 'Do zrobienia'

    buttonAllTasks.addEventListener('click', () => this.render(this.tasks))

    buttonCompletedTasks.addEventListener('click', () => {
      this.completed = this.tasks.filter((task) => task.isCompleted === true)
      this.render(this.completed)
    })
    buttonTasksToBeDone.addEventListener('click', () => {
      this.toBeDone = this.tasks.filter((task) => task.isCompleted === false)
      this.render(this.toBeDone)
    })

    this.selectedHtmlElement.appendChild(buttonAllTasks)
    this.selectedHtmlElement.appendChild(buttonCompletedTasks)
    this.selectedHtmlElement.appendChild(buttonTasksToBeDone)
  }

  addPromptFormForAddingTasks() {
    const input = document.createElement('input')
    const button = document.createElement('button')
    input.className = 'add-task--input'
    input.autofocus = true
    input.placeholder = 'np. wynieś śmieci'
    button.innerText = '+'

    button.addEventListener('click', () => this.addTaskToList(input.value))

    this.selectedHtmlElement.appendChild(input)
    this.selectedHtmlElement.appendChild(button)
  }

  addSearchTaskButton() {
    const input = document.createElement('input')
    const searchButton = document.createElement('button')
    input.className = 'search-task--input'
    searchButton.innerText = 'Szukaj'

    searchButton.addEventListener('click', () => {
      const input = document.querySelector('.search-task--input')
      this.searchedTask = input.value

      
    })

    this.selectedHtmlElement.appendChild(input)
    this.selectedHtmlElement.appendChild(searchButton)
  }

  saveTaskInLocalStorage() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks))
  }

}
const todo = new ToDoList()
