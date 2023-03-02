export const isEveryStringKeyPresentFn = (obj:Object, neededKeys:string[]) =>{
    return neededKeys.every(key=> key in obj && typeof obj[key]==='string')
}
