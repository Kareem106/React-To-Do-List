import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { nanoid } from 'nanoid';
export const Home = () => {
  const navigate=useNavigate();
  const [list,setList]=useState([]);
  const [input,setInput]=useState(null);
  const [err,setErr]=useState(false);
  const addItemHandler=()=>{
    if(input!==null&&input!==""){
      const obj={
        id:nanoid(),
        text:input
      }
      setList([obj,...list]);
      setErr(false);
    }else{
      setErr(true);
    }
  }
  const deleteItemHandler=(id)=>{
    setList(list.filter((item)=>item.id!==id));
  }
  const {token}=useContext(UserContext);
  useEffect(()=>{
    if(!token){
      navigate('/register');
    }
  },[token])
  return (
    <div className='px-5'>
  <form onSubmit={(e)=>{
    e.preventDefault(addItemHandler(e));
    e.target.reset();
    setInput(null);
  }}>   
      <div class="relative">
          <input
          onChange={(e)=>setInput(e.target.value)}
          type="text" id="text" className={
            `block w-full p-4 ps-5 text-sm 
            border-2 
            rounded-lg 
            bg-gray-700 
            ${
              !err?"border-gray-600 ":
              "border-red-700"
            }
            placeholder-gray-400 
            text-white
            focus:border-gray-400 
            outline-none`
          } placeholder="type something here"/>
          <input type="submit" value="add" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
      </div>
  </form>
  

<div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-5">
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {
          list.map((item)=><ItemCard {...item} deleteItemHandler={deleteItemHandler}></ItemCard>)
        }
        </ul>
   </div>
</div>

</div>
  )
}
function ItemCard({id,text,deleteItemHandler}){
  return(
    <li key={id} class="py-3 sm:py-3 my-3">
    <div className="flex items-center">
        <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {text}
            </p>
        </div>
        <div 
        onClick={()=>deleteItemHandler(id)}
        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
        <FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#cc0000",}} />
        </div>
    </div>
</li>
  )
}
