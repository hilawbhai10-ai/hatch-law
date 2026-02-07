export declare const handleOAuthSignupService: (oauthProfile: any) => Promise<{
    success: boolean;
    message: string;
    userId?: never;
    token?: never;
} | {
    success: boolean;
    message: string;
    userId: any;
    token: string;
}>;
export declare const simpleSignupService: (email: string, password_plain: string) => Promise<{
    success: boolean;
    message: string;
    userId?: never;
    token?: never;
} | {
    success: boolean;
    message: string;
    userId: any;
    token: string;
}>;
export declare const simpleSigninService: (email: string, password_plain: string) => Promise<{
    success: boolean;
    message: string;
    userId?: never;
    token?: never;
} | {
    success: boolean;
    message: string;
    userId: any;
    token: string;
}>;
export declare const generateJWTService: (userId: string) => string;
export declare const generateSessionToken: (userId: string) => string;
export declare const verifyJWTService: (token: string) => {
    isValid: boolean;
    userId: string;
    message?: never;
} | {
    isValid: boolean;
    message: string;
    userId?: never;
};
//# sourceMappingURL=tempAuth.service.d.ts.map