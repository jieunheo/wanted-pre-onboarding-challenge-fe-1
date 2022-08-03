import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TodoItem = ({ id, reloadTodos }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    callTodoApi(`todos/${id}`, 'GET');
  }, [id]);

  const [updating, setUpdating] = useState(false);

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
    reloadTodos();
  }

  const cencelHandler = () => {
    setUpdating(false);

    setInputTitle(inputTitle);
    setInputContent(inputContent);
  }

  const deleteHandler = () => {
    navigate('/todos');
    callTodoApi(`todos/${id}`, 'DELETE');
    reloadTodos();
  }

  const callTodoApi = async (param, method, body = null) => {
    const url = `http://localhost:8080/${param}`;
    const response = await fetch(url, {
      method: method,
      headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body)
    })

    if (!response.ok) {
      const { details } = await response.json();
      return;
    }
  
    const { data } = await response.json();
    const { content, createdAt, title, updatedAt } = data;

    setInputTitle(title);
    setInputContent(content);
    setCreatedAt(createdAt);
    setUpdatedAt(updatedAt);
  }

  return (
    <>
      {!updating && (
        <div>
          <h2>{inputTitle}</h2>
          <p>{inputContent}</p>
          <small>{createdAt}</small>
          <div>
            <button type="button" onClick={updateFormHandler}>수정</button>
            <button type="button" onClick={deleteHandler}>삭제</button>
          </div>
        </div>
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
    </>
  );
}

export default TodoItem;