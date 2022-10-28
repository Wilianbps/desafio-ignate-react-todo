import { ChangeEvent, FormEvent, useState } from 'react'

//Styles
import './global.css'
import styles from './App.module.css'

//Api
import { v4 as uuidv4 } from 'uuid'

//Images
import Plus from './assets/plus.svg'
import Clipboard from './assets/Clipboard.svg'

//Components
import { Header } from './components/Header'
import { ToDo } from './components/ToDo'

interface ToDoProps {
  id: string
  title: string
  isComplete: boolean
}

function App() {
  const [toDos, setToDos] = useState<ToDoProps[]>([])
  const [newToDoTitle, setNewToDoTitle] = useState('')

  function handleAddNewToDo(event: FormEvent) {
    event.preventDefault()

    const newToDo = {
      id: uuidv4(),
      title: newToDoTitle,
      isComplete: false
    }

    setToDos(oldToDo => [...oldToDo, newToDo])

    setNewToDoTitle('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewToDoTitle(event.target.value)
  }

  function handleDeleteToDo(id: string) {
    const filteredTasks = toDos.filter(todo => todo.id !== id)
    setToDos(filteredTasks)
  }

  function handleToggleTaskCompletion(id: string) {
    const newtoDo = toDos.map(item =>
      item.id == id ? { ...item, isComplete: !item.isComplete } : item
    )
    setToDos(newtoDo)
  }

  function cont() {
    return toDos.filter(item => item.isComplete === true).length
  }

  return (
    <>
      <Header />
      <form onSubmit={handleAddNewToDo} className={styles.containerInput}>
        <input
          type="text"
          className={styles.input}
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewCommentChange}
          value={newToDoTitle}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={newToDoTitle.length === 0}
        >
          <span>Criar</span>
          <img src={Plus} alt="Plus" />
        </button>
      </form>

      <main className={styles.main}>
        <header>
          <div>
            <span className={styles.textCreatedTasks}>Tarefas criadas</span>
            <span className={styles.numberCreatedTasks}>{toDos.length}</span>
          </div>
          <div>
            <span className={styles.textCompletedTasks}>Concluídas</span>
            <span className={styles.numberCompletedTasks}>
              {`${cont()} de ${toDos.length}`}
            </span>
          </div>
        </header>
        {toDos.length > 0 ? (
          toDos.map(item => (
            <div key={item.id}>
              <ToDo
                toDo={item.title}
                onHandleDeleteToDo={() => handleDeleteToDo(item.id)}
                onHandleToggleTaskCompletion={() =>
                  handleToggleTaskCompletion(item.id)
                }
                toggle={item.isComplete}
              />
            </div>
          ))
        ) : (
          <div className={styles.containerNoTasks}>
            <div className={styles.line}></div>

            <div className={styles.noTaskMessage}>
              <img src={Clipboard} alt="" />
              <p className={styles.bold}>
                Você ainda não tem tarefas cadastradas
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App
