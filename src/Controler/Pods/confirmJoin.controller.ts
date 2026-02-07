import type { Request, Response, NextFunction } from "express"
import { confirmJoinService } from "../../Service/pods/confirmJoin.service.js"

export const confirmJoinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await confirmJoinService(req)
    res.json(data)
  } catch (err) {
    next(err)
  }
}
