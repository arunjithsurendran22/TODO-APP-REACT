import  { useState, useEffect, useRef } from "react";
import api from "../authorization/api";
import { MdModeEdit, MdDelete } from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("/get");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
    inputRef.current.focus();
  }, [todos]);

  const addTodo = async () => {
    try {
      const response = await api.post("/create", { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id.toString() !== id.toString()));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await api.put(`/complete/${id}`, {
        completed: !todos.find((todo) => todo._id === id).completed,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const editTodo = async (id, newTitle) => {
    try {
      await api.put(`/edit/${id}`, { title: newTitle });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEdit = (id, currentTitle) => {
    const newTitle = prompt("Enter the new title:", currentTitle);
    if (newTitle !== null) {
      editTodo(id, newTitle);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };
  

  return (
    <div className="flex py-20 justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-md rounded px-8 py-8 mb-4 flex items-center justify-between">
          <input
            ref={inputRef}
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
        <ul className="bg-white shadow-md rounded px-8 py-6 mb-4">
          {todos.map((todo, index) => (
            <li
              key={todo._id}
              className={`flex items-center justify-between border-b border-gray-200 py-4 ${
                index !== todos.length - 1 ? "mb-4" : "" 
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo._id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-red-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <div className="flex">
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700 focus:outline-none transition duration-300"
                  onClick={() => handleEdit(todo._id, todo.title)}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none transition duration-300"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
