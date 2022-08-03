import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TodoItem = ({ id, reloadTodos }) => {
  const [updating, setUpdating] = useState(false);
  const [todo, setTodo] = useState(null);

  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  
  const navigate = useNavigate();
  
  // 선택한 todo 상세 페이지 보여주기
  useEffect(() => {
    callTodoApi(`todos/${id}`, 'GET');
  }, [id]);

  // form input 수정
  const inputChange = (event) => {
    const { target: { id, value } } = event;

    if(id === 'title') setInputTitle(value);
    if(id === 'content') setInputContent(value);
  }

  // 수정 버튼 클릭 시
  const updateFormHandler = (event) => {
    setUpdating(true);
  }

  // 수정
  const updateHandler = (event) => {
    setUpdating(false);

    callTodoApi(`todos/${id}`, 'PUT', { title: inputTitle, content: inputContent });
    reloadTodos();
  }

  // 취소
  const cencelHandler = () => {
    setUpdating(false);

    setInputTitle(todo.title);
    setInputContent(todo.content);
  }

  // 삭제
  const deleteHandler = () => {
    navigate('/todos');
    callTodoApi(`todos/${id}`, 'DELETE');
    reloadTodos();
  }

  // api 호출
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
    setTodo(data);

    setInputTitle(data.title);
    setInputContent(data.content);
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