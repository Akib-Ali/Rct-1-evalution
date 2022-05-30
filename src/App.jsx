import React, { useEffect, useState } from "react"
import axios from "axios";
import logo from './logo.svg'
import './App.css'
import CandidateCard from "./components/CandidateCard";
import Button from "./components/Button";

function App() {
  const[data,setdata] = useState([])
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [loading,setLoading] = useState(true)

useEffect(()=>{
  setLoading(true)
  Fetchdata({page})
},[page])



  const Fetchdata=({page})=>{

   axios({
     method:"get",
     url:"https://json-server-mocker-masai.herokuapp.com/candidates",
     //url:" http://localhost:8080/users",
     params:{
          _page:page,
          _limit:5

     }
     
   })
   .then((res)=>{
  setdata(res.data)
  setLoading(false)
   }).catch(err=> {
     setError(true)
     setLoading(false)
       
   })
  }
  

  return (
    <div className="App">
  
    <div>
       {loading && 
        <div id="loading-container"> ...loading

        </div> }
          <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`} />  
         
        <Button disabled={page == 1} onClick={()=> setPage(page -1)} title="PREV" id="PREV" />
        

        <Button onClick={()=> setPage(page +1)} title="NEXT" /> 
      </div>
      {data.map((item) =>  <CandidateCard key={item.id} {...item}/>
        
          
        )
      }

     
    </div>
  )
    }

export default App