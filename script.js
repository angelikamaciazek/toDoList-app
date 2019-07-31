class Task {
  constructor(text) {
    this.text = text
    this.isCompleted = false
  }
}

class ToDoList {
  constructor(container) {
    this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || []
    this.completed = []
    this.toBeDone = []
    this.searchedTask = ''
    this.foundTasks = []
    this.container = container || document.body
    this.render(this.tasks)
  }

  render(tasksArray) {
    this.container.innerHTML = ''
    this.addPromptFormForAddingTasks()
    this.addSearchTaskButton()
    this.addFilteringButtons()
    this.addListWithTasks(tasksArray)
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
  addListWithTasks(tasksArray) {
    const ul = document.createElement('ul')
    ul.className = 'to-do-list'
    tasksArray.forEach((task, taskIndex) => {
      const li = document.createElement('li')
      const removeTaskButton = document.createElement('div')
      const removeButton = document.createElement('button')
      removeButton.innerText = 'Usuń'
      
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
      
      removeTaskButton.appendChild(removeButton)
      li.innerText = task.text
      if (task.isCompleted) {
        li.style.textDecoration = "line-through"
        li.style.textDecorationColor = 'gray'
      }
      li.appendChild(removeTaskButton)
      ul.appendChild(li)
    })
    this.container.appendChild(ul)
  }
  
  addFilteringButtons() {
    const buttonAllTasks = document.createElement('button')
    const buttonCompletedTasks = document.createElement('button')
    const buttonTasksToBeDone = document.createElement('button')
    buttonAllTasks.innerText = 'Wszystkie'
    buttonAllTasks.className = 'filter--button'
    buttonCompletedTasks.innerText = 'Zrobione'
    buttonCompletedTasks.className = 'filter--button'
    buttonTasksToBeDone.innerText = 'Do zrobienia'
    buttonTasksToBeDone.className = 'filter--button'
    const buttonsContainer = document.createElement('div')
    
    buttonAllTasks.addEventListener('click', () => this.render(this.tasks))
    
    buttonCompletedTasks.addEventListener('click', () => {
      this.completed = this.tasks.filter((task) => task.isCompleted === true)
      this.render(this.completed)
    })
    buttonTasksToBeDone.addEventListener('click', () => {
      this.toBeDone = this.tasks.filter((task) => task.isCompleted === false)
      this.render(this.toBeDone)
    })
    
    this.container.appendChild(buttonAllTasks)
    this.container.appendChild(buttonCompletedTasks)
    this.container.appendChild(buttonTasksToBeDone)
  }
  
  addPromptFormForAddingTasks() {
    const input = document.createElement('input')
    input.className = 'add-task--input'
    const button = document.createElement('button')
    button.className = 'add-task--button'
    input.autofocus = true
    input.placeholder = 'np. wynieś śmieci'
    button.innerText = '+'
    
    button.addEventListener('click', () => this.addTaskToList(input.value))
    
    this.container.appendChild(input)
    this.container.appendChild(button)
  }
  
  addSearchTaskButton() {
    const searchInput = document.createElement('input')
    searchInput.className = 'search-task--input'
    const searchButton = document.createElement('button')
    searchButton.className = 'search-task--button'
    searchButton.innerText = 'Szukaj'
    
    searchButton.addEventListener('click', () => {
      const searchInput = document.querySelector('.search-task--input')
      this.searchedTask = searchInput.value
      
      this.findingTasks = this.tasks.filter((task) => (
        task.text
        .toLowerCase()
        .includes(
          this.searchedTask
          .toLowerCase()
          )
          ))
          this.render(this.findingTasks)
        })
        
        this.container.appendChild(searchInput)
        this.container.appendChild(searchButton)
      }
      
      saveTaskInLocalStorage() {
        window.localStorage.setItem("tasks", JSON.stringify(this.tasks))
      }

      
      
    }
    const todo = new ToDoList()
    
    