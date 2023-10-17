import React, {useEffect, useRef, useState} from "react";

import Body from "../components/Body";
import Header from "../components/Header";
import axios from "axios";

function Home() {

  const originalEmployees = useRef([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/employee/")
      .then(resp => {
        setEmployees(resp.data)
        originalEmployees.current = resp.data
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    const body = document.querySelector('body')
    body.className = 'main-page'
    body.style.backgroundColor = '#403866'
  }, [])


  return (
    <div className="wrapper">
      <Header employees={employees} setEmployees={setEmployees} originalEmployees={originalEmployees}/>
      <div className="content__items">
        <Body employees={employees} originalEmployees={originalEmployees} setEmployees={setEmployees}/>
      </div>
    </div>
  )
}

export default Home