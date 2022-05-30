import React, { useEffect, useState } from "react"
import axios from "axios";
import logo from './logo.svg'
import './App.css'
import CandidateCard from "./components/CandidateCard";
import Button from "./components/Button";
//import { sortUserPlugins } from "vite";

function App() {
 
 
  const[data,setdata] = useState([])
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [loading,setLoading] = useState(true)
  const [sort,setSort]  = useState("DESC")

useEffect(()=>{
setLoading(true)
setError(false)
  Fetchdata()
},[page,sort])



  const Fetchdata=()=>{

   axios({
    
     method:"get",
     url:"https://json-server-mocker-masai.herokuapp.com/candidates",
     //url:" http://localhost:8080/users",
     params:{
          _page:page,
          _limit:5,
          _sort:'salary',
          order:sort

     }
     
   })
   .then((res)=>{

  setdata(res.data)
  setLoading(false)
   }).catch((err)=> {
     setError(true)
     setLoading(false)
       
   })
  }



  return (
    <div className="App">
  
    <div>
     {loading && <div id="loading-container"> ...loading </div> }
       {error &&  <div> ...error </div>}

          <Button disabled={ sort ==='ASC'} id="SORT_BUTTON" title={`Sort by Ascending Salary`}  onClick={()=> setSort("ASC")}/>  
         
        <Button disabled={page === 1} onClick={()=> setPage(page -1)} title="PREV" id="PREV" />
        

        <Button  onClick={()=> setPage(page +1)} id="NEXT" title="NEXT" /> 
      </div>
      {data.map((item) =>  <CandidateCard key={item.id} {...item}/>
        
          
        )
      }

     
    </div>
  )
    }

export default App