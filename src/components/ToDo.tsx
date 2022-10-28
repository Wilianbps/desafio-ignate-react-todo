import styles from './ToDo.module.css'
import Trash from '../assets/trash.svg'
import { useState } from 'react'

interface ToDoProps {
  toDo: string
  onHandleDeleteToDo: () => void
  onHandleToggleTaskCompletion: () => void
  toggle: boolean
}

export function ToDo({
  toDo,
  onHandleDeleteToDo,
  onHandleToggleTaskCompletion,
  toggle
}: ToDoProps) {
  return (
    <main className={styles.container}>
      <div className={styles.ToDoItem}>
        <div
          className={styles.containerToDo}
          onClick={onHandleToggleTaskCompletion}
        >
          <input
            type="checkbox"
            checked={toggle}
            readOnly
            onClick={onHandleToggleTaskCompletion}
          />
          <span className={styles.checkmark}></span>
        </div>
        <p className={toggle ? styles.underlinedText : styles.text}>{toDo}</p>
        <img src={Trash} alt="" onClick={onHandleDeleteToDo} />
      </div>
    </main>
  )
}
