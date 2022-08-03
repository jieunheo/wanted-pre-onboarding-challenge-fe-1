import { useEffect, useState } from "react";
import ToDo from "../components/todo/ToDo";
import ToDoItem from "../components/todo/ToDoItem";
import ToDoForm from "../components/todo/ToDoForm";
import { useParams } from "react-router";

const ToDos = () => {
  const { id } = useParams();
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
      {id && <ToDoItem id={id} reloadTodos={reloadTodos}/>}
      <ToDoForm setTodos={setTodos} />
      <ul>
        {todos.length > 0 && todos.map((todo) => <ToDo key={todo.id} todo={todo} />)}
        {todos.length === 0 && (
          <li>Todo가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default ToDos;