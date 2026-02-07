export declare const SignupServiceLayer: (password: string, username: string, email: string) => Promise<string | undefined>;
export declare const SignupVerificationLayer: (OTP: number, Redis_Id: string) => Promise<string>;
export declare const SignupUserOnbardingServiceLayer: (Redis_ID: string, Questions: any) => Promise<string>;
//# sourceMappingURL=Singup.Services.d.ts.map