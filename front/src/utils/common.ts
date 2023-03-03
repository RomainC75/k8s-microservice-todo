export const extractSimpleDate = (strDate:string):string =>{
    const date= new Date(strDate)
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDay().toString().padStart(2,'0')}`
}

export const getRealYYYMMDD = (date:string):string =>{
    const parts:string[]=date.split("-")
    parts[1]=(parseInt(parts[1])+1).toString().padStart(2,'0')
    console.log("parts", parts)
    return parts.join("-")
}