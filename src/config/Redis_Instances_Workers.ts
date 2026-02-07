import {Redis} from "ioredis";


const Redis_Client_Workers = new Redis({
    maxRetriesPerRequest: null,
    enableReadyCheck: true
})

export default Redis_Client_Workers

