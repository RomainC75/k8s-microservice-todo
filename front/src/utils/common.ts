export const extractSimpleDate = (strDate:string):string =>{
    const date= new Date(strDate)
    console.log('extract simple date : ', date)
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

export const getRealYYYMMDD = (date:string):string =>{
    const parts:string[]=date.split("-")
    parts[1]=(parseInt(parts[1])+1).toString().padStart(2,'0')
    console.log("parts", parts)
    return parts.join("-")
}

export const extractDisplayableDate = (strDate:string):string =>{
    const date = new Date(strDate)
    return `${date.getDate()} ${monthConvertor[date.getMonth()]} ${date.getFullYear()}`
}

export const getInitialDate = ():string =>{
    const date = new Date(Date.now())
    return date.toISOString().split("T")[0]
}

const monthConvertor: string[] = ['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.']
