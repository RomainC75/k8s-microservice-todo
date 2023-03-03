import React, { useState, ChangeEvent, FormEvent, useEffect, useContext } from "react";
import { NewTodoInterface } from "../@types/todo.type";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { PurpleButton, PurpleTextField } from "../utils/mui-custom-colors";
import { TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { extractSimpleDate, getRealYYYMMDD } from "../utils/common";
import { createTodo } from "../utils/todos-helper";

const CreateNewTodo = () => {
  const { selectedListId, setSelectedListId, todos, isLoadingTodos, updateTodos } =
    useContext(DataContext) as DataContextInterface;
  const [isNameValid, setIdNameValid] = useState<boolean>(true);

  const [newTodo, setNewTodo] = useState<NewTodoInterface>({
    name: "",
    description: undefined,
    deadLine: getRealYYYMMDD(
      extractSimpleDate(new Date(Date.now()).toString())
    ),
    isDone: false,
  });

  const handleInputs = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newTodoBuffer: NewTodoInterface = {
      ...newTodo,
      [e.target.name]: e.target.value,
    };
    console.log("=>handleInputs", e.target.value);
    setNewTodo(newTodoBuffer);
  };

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("==>", newTodo);
    selectedListId && createTodo(selectedListId,newTodo).then(ans=>{
      console.log("==> ans : ", ans)
      updateTodos()
    })
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <PurpleTextField
          id="name"
          name="name"
          label="name"
          variant="outlined"
          value={newTodo.name}
          onChange={handleInputs}
          helperText={!isNameValid && "need a name"}
          error={!isNameValid}
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


        <PurpleButton variant="contained" type="submit" disabled={false}>
          Create
        </PurpleButton>
      </form>
    </div>
  );
};

export default CreateNewTodo;
