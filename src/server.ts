import http from "http"
import app from "./app.js"
import { initRealtime } from "./realtime/index.js"

const server = http.createServer(app)

// attach socket.io
initRealtime(server)

const PORT = process.env.PORT || 8001
server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`)
})
