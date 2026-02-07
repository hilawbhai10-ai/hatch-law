import type { Request, Response, NextFunction } from "express";
import type { PodRole } from "@prisma/client";
export declare const requirePodRole: (...allowedRoles: PodRole[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requirePodRole.d.ts.map