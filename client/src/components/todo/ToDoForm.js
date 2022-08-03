import React, { useState } from 'react';

const ToDoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitHnadler = (event) => {
    event.preventDefault();

    callTodoApi();
  }

  const inputChange = (event) => {
    const { target: { id, value } } = event;

    if(id === 'title') setTitle(value);
    if(id === 'content') setContent(value);
  }

  const callTodoApi = async () => {
    const url = `http://localhost:8080/todos`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })

    if (!response.ok) {
      const { details } = await response.json();
      return;
    }
  
    const { data } = await response.json();
    setTodos((prevTodos) => [...prevTodos, data]);
    
    setTitle('');
    setContent('');
  }

  return (
    <>
      <form method='post' action='/users/create' onSubmit={submitHnadler}>
        <div>
          <label htmlFor='title'>title</label>
          <input type='text' id='title' value={title} onChange={inputChange} />
        </div>
        <div>
          <label htmlFor='content'>content</label>
          <input type='text' id='content' value={content} onChange={inputChange} />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default ToDoForm;