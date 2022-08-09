import { React, useEffect, useState } from 'react'

function App() {

  const [todos, setTodos] = useState(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetch('api/todos')
      .then(res => res.json())
      .then(json => setTodos(json.todos))
      .catch(err => console.log(err))
  }, [])


  const createTodo = async () => {
    try {
      const response = await fetch("api/todos", { method: 'POST', body: JSON.stringify({ name }) })
      const json = await response.json()

      setTodos([...todos, json.todo])
      setName("")
    } catch (err) {
      console.log(err);
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault()
    createTodo()
  }



  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" })

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="container">
      <div className="app">
        <h1 className="fw-normal text-center my-3">Todos</h1>
        <div className="todo-holder">
          {!todos
            ?
            <p className="px-3 text-gray-500">
              Loading...
            </p>
            :
            (
              <div>
                {todos.map(({ id = 0, name = "empty" }) => (
                  <div className="content" key={id} data-testid="todo">
                    <input type="checkbox" value={name} />
                    <div className="info mx-3">
                      {name}
                    </div>
                    <button className="btn btn-danger mx-3" onClick={() => deleteTodo(id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}

          <div className="my-4">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <input type="text" className="form-control" data-testid="post-todo" placeholder='Todo' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-success w-20">+</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
