import { useState } from "react";
import { useNavigate } from "react-router";

const Todo = ({ todo }) => {
  const { content, createdAt, id, title, updatedAt } = todo;
  const navigate = useNavigate();
  
  const clickTodo = () => {
    navigate(`/todos/${id}`);
  }

  return (
    <li onClick={clickTodo}>
      <h2>{title}</h2>
      <small>{new Date(createdAt).toISOString()}</small>
    </li>
  );
}

export default Todo;