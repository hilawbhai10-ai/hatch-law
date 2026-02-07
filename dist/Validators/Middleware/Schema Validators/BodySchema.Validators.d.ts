import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";
export declare const Validators: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=BodySchema.Validators.d.ts.map