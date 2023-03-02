import React, { useEffect } from 'react'
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import { Navigate } from "react-router-dom";
import { ListInterface } from '../@types/list.type';
import { getLists } from '../utils/axios-helper';
import ListItem from './ListItem';


const ListPanel = () => {
    const { authenticateUser, isLoading, isLoggedIn, user } =
    useContext(AuthContext) as AuthContextInterface;
    const [lists, setLists] = useState<ListInterface[]>([])

    useEffect(()=>{
        getLists().then(ans=>{
            console.log('====>',ans)
            if(ans.status===200){
                setLists(ans.data)
            }
        })
    },[])

  return (
    <div className='ListPanel'>
        {lists.map(list=><ListItem key={list._id} listItem={list}/>)}
    </div>
  )
}

export default ListPanel