import { useState } from "react";
import './TodoList.css';

function TodoList() {
    const [inputValue, setInputValue] = useState("");
    const [todo, setTodo] = useState([])

    const createTodo = (title) => {
        return ({
            title: title,
            status: false
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue != " ") {
            const newTodo = createTodo(inputValue);
            setTodo([...todo, newTodo])
            setInputValue("");
        }
    }

    const handleCheck = (index) => {
        const todoCopy = [...todo]
        const todoIndex = todoCopy[index]
        todoIndex.status = true;
        todoCopy[index] = todoIndex;

        setTodo([...todoCopy])
    }

    return (
        <>
            <div>
                <h1>My todo-list</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="New todo..."
                        className="inputAdd"
                        data-testid="inputAdd"
                    />
                </form>
            </div>

            <div className="bodytodo">
                <div className="todo">
                    <h2 className="title">Todo</h2>
                    <hr />
                    <div className="scroller">
                        {todo.map((todo, index) => {
                            return (
                                !todo.status && <div className="checkbox"  data-testid="valueTodo">
                                    <input type="checkbox" name="" id="" onChange={() => handleCheck(index)} data-testid="checkbox"/>
                                    <span className="value">{todo.title}</span>
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className="done">
                    <h2 className="title">Done</h2>
                    <hr />
                    <div className="scroller" >{todo.map((todo) => {
                        return (
                            todo.status && <div className="checkbox" data-testid="valueDone">
                                
                                <span className="value" > {todo.title} </span>
                            </div>
                        );
                    })}</div>

                </div>
            </div>
        </>
    );
}

export default TodoList;