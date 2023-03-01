import { UpdatableTodoDataInterface } from '../@types/todo.type'

// The object is supposed to have 4 keys
export const verifyAndCleanTodoUpdateData = (
  rawUpdateData: any
): UpdatableTodoDataInterface | null => {
    console.log("raw",rawUpdateData)
  const neededKeys: string[] = ['name', 'isDone', 'deadLine']
  const authorizedKeys: string[] = ['name', 'isDone', 'description', 'deadLine']

  const isEachNeededKeyInData: boolean = neededKeys.every(
    (key: string) => rawUpdateData[key]!==undefined
  )
  if (!isEachNeededKeyInData) {
    return null
  }

  // clean the other keys
  Object.keys(rawUpdateData).forEach((key: string) => {
    if (!authorizedKeys.includes(key)) {
      delete rawUpdateData[key]
    }
  })

  console.log('==>rawUpdateData', rawUpdateData)

  return rawUpdateData
}
