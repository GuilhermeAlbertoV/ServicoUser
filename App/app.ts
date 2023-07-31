import Express from "express"
const server = Express()
class App {
    constructor() {
        this.servidor()
    }

    servidor() {
        server.listen(5000, () => {
            console.log('Servidor Rodando na porta 5000')
        })
    }
}

new App