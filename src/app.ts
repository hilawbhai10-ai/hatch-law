import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import type { Response,Request,NextFunction } from "express"

// router imports
import authRoutes from "./Routes/Auth/auth.routes.js"
import tempAuthRoutes from "./tempAuth/Routes/tempAuth.routes.js"
import podRoutes from "./Routes/Pods/pods.routes.js"
import User from "./Routes/User/user.routes.js"

dotenv.config({ path: "../.env" })

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: "Invalid JSON body. JSON does not support comments."
        })
    }
    next(err)
})

app.get("/api/", (req, res) => {
   res.send("API is running")
})
app.use("/api/auth/", tempAuthRoutes)
app.use("/api/pods/", podRoutes)
app.use("/apis/Hatch/User", User)

export default app
