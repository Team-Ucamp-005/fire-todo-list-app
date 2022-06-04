import React, { useState, useEffect } from 'react'
import env from "react-dotenv";

import {
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase.js'

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState({})

  const getData = () => {
    const todosArr = [];

    onSnapshot(collection(db, 'todos'), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        todosArr.push({
          ...doc.data(),
          id: doc.id
        })
        console.log(todosArr)
        setTodos(todosArr)
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
  const deleteElement = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, 'todos', id));
    getData();
  }

  const updateElement = async (id, data) => {
    await setDoc(doc(db, 'todos', id), data)
    getData()
  }

  useEffect(() => {
    getData()
    console.log(env.HOLI)
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
                  <button onClick={() => deleteElement(todo.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => updateElement(todo.id, { ...todo, check: !todo.check })} >
                    {todo.check ? 'Desmarcar' : 'Marcar'}
                  </button>
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
