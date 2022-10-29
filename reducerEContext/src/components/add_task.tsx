import { ChangeEvent, FormEvent} from "react"

interface AddTaskProps{
    onAddTask: (text: string) => void
}
/*
export function AddTask({onAddTask}: AddTaskProps){

    const [taskText, setTaskText] = useState('')

    const handlerDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const handlerSubmit = (event: FormEvent) => {
        event.preventDefault()
        onAddTask(taskText)
        setTaskText('')
    }

    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input 
                    type="text" 
                    value={taskText} 
                    onChange={handlerDescriptionChange}  
                    placeholder="Descrição" />
                <input type="submit" value="Adicionar Tarefa" />
            </form>
        </>
    )
}*/

import { useState } from 'react';

export default function AddTask({ onAddTask}: AddTaskProps) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
