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
      this.selectedHtmlElement = selectedHtmlElement || document.body
      this.render(this.tasks)
  }

  render(array) {
      this.selectedHtmlElement.innerHTML = ''
      this.addPromptFormForAddingTasks()
      this.addFilteringButtons()
      this.addListWithTasks(array)
  }

  addTaskToList(text) {
      if (text == '' || text == null) {
          alert("To zadanie zjadasz na śniadanie! :)")
      } else {
          this.tasks.push(new Task(text))
          this.saveTaskInLocalStorage()
      }
      this.render(this.tasks)
  }
  addListWithTasks(array) {
      const ul = document.createElement('ul')
      ul.className = 'todo-list'
      array.forEach((task, taskIndex) => {
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

      buttonAllTasks.addEventListener('click', () => {
        const allTasksArray = this.tasks.concat()
        this.render(this.tasks)
        console.log(allTasksArray)
        console.log('clicked')
    })
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
      button.innerText = '+'

      button.addEventListener('click', () => this.addTaskToList(input.value))

      this.selectedHtmlElement.appendChild(input)
      this.selectedHtmlElement.appendChild(button)
  }

  saveTaskInLocalStorage() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks))
}

}
// const todo = new ToDoList()
const todo = new ToDoList(document.querySelector('.testing'))
