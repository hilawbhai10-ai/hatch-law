import z from "zod";
export declare const sigin_zod_validation_schema: z.ZodObject<{
    Email: z.ZodOptional<z.ZodString>;
    Username: z.ZodOptional<z.ZodString>;
    Password: z.ZodString;
}, z.z.core.$strip>;
export declare const Signup_zod_schema: z.ZodObject<{
    Email: z.ZodString;
    Username: z.ZodString;
    Password: z.ZodString;
    Name: z.ZodString;
    DOB: z.ZodString;
}, z.z.core.$strip>;
export declare const SignupVerificationSchema: z.ZodObject<{
    OTP: z.ZodString;
}, z.z.core.$strip>;
export declare const SignupOnboardingQuestionsSchema: z.ZodObject<{
    Questions: z.ZodObject<{
        Question_1: z.ZodObject<{
            Question: z.ZodLiteral<string>;
            Answers: z.ZodEnum<{
                [x: string]: string;
            }>;
        }, z.z.core.$strip>;
        Question_2: z.ZodObject<{
            Question: z.ZodLiteral<string>;
            Answers: z.ZodEnum<{
                [x: string]: string;
            }>;
        }, z.z.core.$strip>;
        Question_3: z.ZodObject<{
            Question: z.ZodLiteral<string>;
            Answers: z.ZodEnum<{
                [x: string]: string;
            }>;
        }, z.z.core.$strip>;
        Question_4: z.ZodObject<{
            Question: z.ZodLiteral<string>;
            Answers: z.ZodEnum<{
                [x: string]: string;
            }>;
        }, z.z.core.$strip>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const ForgotPassEmailVerification: z.ZodObject<{
    Email: z.ZodString;
}, z.z.core.$strip>;
export declare const FrogotPassOTPVerificationzodSchema: z.ZodObject<{
    OTP: z.ZodString;
}, z.z.core.$strip>;
export declare const ForgotPassPassChangeSchema: z.ZodObject<{
    Password: z.ZodString;
}, z.z.core.$strip>;
export declare const UserPublicInfoShema: z.ZodString;
export declare const Pods_Zoining_Schema: z.ZodObject<{
    isPublic: z.ZodBoolean;
    Name: z.ZodOptional<z.ZodString>;
    Url: z.ZodString;
}, z.z.core.$strip>;
export declare const WebsocketRequestIdValidation: z.ZodString;
//# sourceMappingURL=Zod_Validation.d.ts.map