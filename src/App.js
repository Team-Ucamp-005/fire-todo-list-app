import React, { useState, useEffect } from 'react'

import { onSnapshot, query, collection, orderBy, addDoc } from 'firebase/firestore'
import { db } from './firebase.js'

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState({})

  const getData = () => {
    const todosArr = [];

    onSnapshot(collection(db, 'todos'), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        todosArr.push(doc.data())
        setTodos(todosArr)
        console.log(doc.data())
      })
    })
  }

  const handleChange = (ev) => {
    const date = new Date(Date.now())
    setForm({
      ...form,
      [ev.name]: ev.name === 'check' ? ev.checked : ev.value,
      date: date
    })
    console.log(form)
  }
  const handleClick = async () => {
    await addDoc(collection(db, 'todos'), form)
    setForm({})
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h1>
          Firebase App
        </h1>
        <div>
          <input type="text" placeholder="titulo" name="titulo" onChange={(e) => handleChange(e.target)} />
          <input type="text" placeholder="descripcion" name="descripcion" onChange={(e) => handleChange(e.target)} />
          <input type="checkbox" placeholder="descripcion" name="check" onChange={(e) => handleChange(e.target)} />
          <button onClick={() => handleClick()}>Guardar</button>
        </div>
        <div>
          {
            todos.map(todo => {
              return (
                <>
                  <h3>{todo.titulo}</h3>
                  <p>{todo.descripcion}</p>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
