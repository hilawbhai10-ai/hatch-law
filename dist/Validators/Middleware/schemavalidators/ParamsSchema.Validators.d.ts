import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";
export declare const ParamsValidators: (schema: ZodTypeAny, key: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=ParamsSchema.Validators.d.ts.map