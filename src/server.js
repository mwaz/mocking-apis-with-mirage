import { Server, Model } from 'miragejs';


export function makeServer({ environment = 'development' } = {}) {
    let server = new Server({
        environment,

        models: {
            todo: Model
        },

        seeds(server) {
            server.create("todo", { name: "Groom the cat" });
            server.create("todo", { name: "Do the dishes" });
            server.create("todo", { name: "Go shopping" });
        },


        routes() {
            // GET REQUEST
            this.get("/api/todos", (schema, request) => {
                return schema.todos.all()
            })

            // POST REQUEST
            this.post("/api/todos", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                
                return schema.todos.create(attrs)
            })

            //DELETE TODO
            this.delete("/api/todos/:id", (schema, request) => {
                let id = request.params.id

                return schema.todos.find(id).destroy()
            })
        }
    })
    return server
}