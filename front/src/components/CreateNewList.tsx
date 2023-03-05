import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PurpleTextField } from "../utils/mui-custom-colors";

import { ListInterface } from "../@types/list.type";

import './styles/createNewList.css'

interface CreateNewListInterface {
  handleCreateNewList: (name: string) => void;
  lists: ListInterface[];
}

const CreateNewList = ({
  handleCreateNewList,
  lists,
}: CreateNewListInterface): JSX.Element => {

  const [newName, setNewName] = useState<string>("");
  const [isNameAlreadyUsed, setIsNameAlreadyUsed] = useState<boolean>(false);

  const handleName = (name: string) => {
    setNewName(name);
    const isUsed:boolean = lists.some((list) => list.name === name)
    setIsNameAlreadyUsed(isUsed);
    

  };

  const handleCreation = () =>{
    handleCreateNewList(newName)
    setNewName('')
  }

  return (
    <div className="CreateNewList">
      <PurpleTextField
        id="newName"
        label="enter a new list name"
        variant="outlined"
        onChange={(e) => handleName(e.target.value)}
        value={newName}
        helperText={isNameAlreadyUsed && "already used!"}
        error={isNameAlreadyUsed}
        onKeyDown={(e)=>e.key==='Enter' && !isNameAlreadyUsed && handleCreation()}
      />
      <FontAwesomeIcon
        className="cursor"
        icon={faPlus}
        onClick={() => !isNameAlreadyUsed && handleCreation()}
        size="xl"
        style={{color:"#635FC7"}}
      />
    </div>
  );
};

export default CreateNewList;
