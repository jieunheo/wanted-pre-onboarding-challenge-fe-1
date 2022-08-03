import { useEffect, useState } from "react";
import ToDo from "../components/todo/ToDo";
import ToDoForm from "../components/todo/ToDoForm";

const ToDos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const url = `http://localhost:8080/todos`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const { details } = await response.json();
      console.log(details);
      return;
    }
  
    const { data } = await response.json();
    setTodos([...data]);
  }

  const reloadTodos = () => {
    getTodos();
  };

  return (
    <div>
      <ToDoForm setTodos={setTodos} />
      <ul>
        {todos.length > 0 && todos.map((todo, index) => <ToDo key={todo.id} todo={todo} reloadTodos={reloadTodos} />)}
        {todos.length === 0 && (
          <li>Todo가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default ToDos;