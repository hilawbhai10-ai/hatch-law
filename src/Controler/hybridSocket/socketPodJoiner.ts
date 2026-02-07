import { getIO } from "../../realtime/index.js";

const io = getIO()

export const joinUserToPodSockets = (
  userId: string,
  podId: string
) => {

  const userRoom = `user:${userId}`
  const podRoom = `pod:${podId}`

  const sockets = io.in(userRoom).fetchSockets()

  sockets.then(list => {

    list.forEach(socket => {

      socket.join(podRoom)

      socket.join(`pod:${podId}:general`)
      socket.join(`pod:${podId}:resources`)
      socket.join(`pod:${podId}:activity`)
      socket.join(`pod:${podId}:collaboration`)

    })

  })

}
