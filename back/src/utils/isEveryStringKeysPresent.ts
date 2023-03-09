export const isEveryStringKeyPresentFn = (obj:object, neededKeys:string[]) =>{
    return neededKeys.every(key=> key in obj && typeof obj[key]==='string')
}
