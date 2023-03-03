export const extractSimpleDate = (strDate:string):string =>{
    const date= new Date(strDate)
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDay().toString().padStart(2,'0')}`
}