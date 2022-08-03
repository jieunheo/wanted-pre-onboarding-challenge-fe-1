import { useState } from "react";

const Todo = ({ todo, reloadTodos }) => {
  const { content, createdAt, id, title, updatedAt } = todo;
  const [updating, setUpdating] = useState(false);

  const [inputTitle, setInputTitle] = useState(title);
  const [inputContent, setInputContent] = useState(content);

  const inputChange = (event) => {
    const { target: { id, value } } = event;

    if(id === 'title') setInputTitle(value);
    if(id === 'content') setInputContent(value);
  }

  const updateFormHandler = (event) => {
    setUpdating(true);
  }

  const updateHandler = (event) => {
    setUpdating(false);

    callTodoApi(`todos/${id}`, 'PUT', { title: inputTitle, content: inputContent });
  }

  const cencelHandler = () => {
    setUpdating(false);

    setInputTitle(title);
    setInputContent(content);
  }

  const deleteHandler = () => {
    callTodoApi(`todos/${id}`, 'DELETE');
  }

  const callTodoApi = async (param, method, body = null) => {
    const url = `http://localhost:8080/${param}`;
    const response = await fetch(url, {
      method: `${method}`,
      headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body)
    })

    if (!response.ok) {
      const { details } = await response.json();
      return;
    }
  
    const { data } = await response.json();
    reloadTodos();
  }

  return (
    <li>
      {!updating && (
        <>
          <h2>{title}</h2>
          <small>{new Date(createdAt).toISOString()}</small>
          <div>
            <button type="button" onClick={updateFormHandler}>수정</button>
            <button type="button" onClick={deleteHandler}>삭제</button>
          </div>
        </>
      )}
      {updating && (
        <>
          <div>
            <label htmlFor='title'>title</label>
            <input type='text' id='title' value={inputTitle} onChange={inputChange} />
          </div>
          <div>
            <label htmlFor='content'>content</label>
            <input type='text' id='content' value={inputContent} onChange={inputChange} />
          </div>

          <div>
            <button type="button" onClick={updateHandler}>수정</button>
            <button type="button" onClick={cencelHandler}>취소</button>
          </div>
        </>
      )}
    </li>
  );
}

export default Todo;