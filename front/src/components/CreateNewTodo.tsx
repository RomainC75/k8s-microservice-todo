import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { DataContext } from '../context/data.context'
import { TextField } from '@mui/material'
import { Textarea } from '@mui/joy'
import { PurpleButton, PurpleTextField } from '../utils/mui-custom-colors'
import { isNameAlreadyUsedFn } from '../utils/todos-helper'
import { getInitialDate } from '../utils/common'

import { NewTodoInterface } from '../@types/todo.type'
import { DataContextInterface } from '../@types/dataContext.type'

import './styles/createNewTodo.css'

const CreateNewTodo = () => {
  const { todos, handleCreateNewTodo } = useContext(
    DataContext
  ) as DataContextInterface
  const [isNameAlreadyUsed, setIsNameAlreadyUsed] = useState<boolean>(true)
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(true)

  const [newTodo, setNewTodo] = useState<NewTodoInterface>({
    name: '',
    description: undefined,
    deadLine: getInitialDate(),
    isDone: false,
  })

  const handleInputs = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newTodoBuffer: NewTodoInterface = {
      ...newTodo,
      [e.target.name]: e.target.value,
    }
    setNewTodo(newTodoBuffer)
    if (newTodoBuffer.name.length === 0) {
      setIsNameEmpty(true)
    } else {
      setIsNameEmpty(false)
      if (isNameAlreadyUsedFn(todos, newTodoBuffer.name)) {
        setIsNameAlreadyUsed(true)
      } else {
        setIsNameAlreadyUsed(false)
      }
    }
  }

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCreateNewTodo(newTodo)
  }

  useEffect(() => {
    console.log('==> new todo', newTodo)
  }, [])

  return (
    <div className="CreateNewTodo">
      <form onSubmit={handleForm}>
        <PurpleTextField
          id="name"
          name="name"
          label="name"
          variant="outlined"
          value={newTodo.name}
          onChange={handleInputs}
          helperText={
            (isNameEmpty && 'need a name') ||
            (isNameAlreadyUsed && 'name is already used')
          }
          error={isNameEmpty || isNameAlreadyUsed}
        />
        <TextField
          id="deadLine"
          label="dead line"
          type="date"
          name="deadLine"
          onChange={handleInputs}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          value={newTodo.deadLine}
        />
        <Textarea
          minRows={2}
          placeholder="type your description"
          size="md"
          id="description"
          name="description"
          variant="outlined"
          value={newTodo.description}
          onChange={handleInputs}
        />

        <PurpleButton
          variant="contained"
          type="submit"
          disabled={isNameAlreadyUsed || isNameEmpty}
        >
          Create
        </PurpleButton>
      </form>
    </div>
  )
}

export default CreateNewTodo
