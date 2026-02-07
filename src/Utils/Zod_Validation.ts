import z, { boolean } from "zod"
import fs from "fs"

const Minimum_User_Years = 2013

// const data = fs.readFileSync("./Onboarding_questions.json", "utf-8")
// const Data_objects = JSON.parse(data)


const Data_objects = {
    "Questions": {
    "Question 1": {
      "Question": "What is your interest?",
      "Answers": [
        "Programming",
        "Designing",
        "Studying",
        "Sports"
      ]
    },
    "Question 2": {
      "Question": "Which field do you want to build a career in?",
      "Answers": [
        "Backend Development",
        "Frontend Development",
        "Cybersecurity",
        "Data Science"
      ]
    },
    "Question 3": {
      "Question": "How much time can you dedicate daily to learning?",
      "Answers": [
        "Less than 1 hour",
        "1-2 hours",
        "2-4 hours",
        "More than 4 hours"
      ]
    },
    "Question 4": {
      "Question": "What best describes your current skill level?",
      "Answers": [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Professional"
      ]
    }
  }
}




export const sigin_zod_validation_schema = z.object({
    Email : z.string().email({message : "Please Provide a Valid Email"}).optional(),
    Username : z.string().min(3,{message : "Please Provide a Valid Username"}).max(12,{message : "Please Provide a Valid Username"}).optional(),
    Password : z.string().min(8, {message : "Please Provide a Valid Password"}).max(60, {message : "Please Provide a Valid Password"})
}).refine((data) => { 
    if ((!data.Email && !!data.Username) || (!data.Username && !!data.Email)) { // 
    return false;
}
    return true
},{
    message : "Please pass Email or Username",
    path : ["Email"]
})

export const Signup_zod_schema = z.object({
    Email : z.string().email({message : "Please Provide a valid Email"}),
    Username : z.string().min(3,{message : "Username Should contain more then 3 character"}).max(12,{message : "Username Should not contain more then 12 characters"}),
    Password : z.string().min(8,{message : "Password should have more then 8 characters"}).max(80,{message : "Password should not contain more then 80 characters"}),
    Name : z.string().min(2,{message : "Please Provide a Valid Name"}).max(60,{message : "Please provide a Valid Name"}),
    DOB : z.string().regex(/^\d{4}-\d{2}-\d{2}$/,{message: "Please Pass a Valid Date1"}).refine((val) => {
        const date = new Date(val) 
        console.log(date.getFullYear())
        if (isNaN(date.getFullYear())) return false
        return true
    },{
        path : ["DOB"],
        message : "Please Pass a valid Date"
    })
}).refine((val) => {
    const DOB_Date = new Date(val.DOB)
    if (DOB_Date.getFullYear() > Minimum_User_Years) return false

    return true
},{
    path : ["DOB"],
    message : "User should be above 13 years old"
})  

export const SignupVerificationSchema = z.object({
    OTP : z.string().length(4)
})

export const SignupOnboardingQuestionsSchema = z.object({
    Questions : z.object({
        Question_1 : z.object({
            Question : z.literal(Data_objects.Questions["Question 1"].Question),
                Answers : z.enum(
                    [...Data_objects.Questions["Question 1"].Answers]
                )
        }),
        Question_2 : z.object({
            Question : z.literal(Data_objects.Questions["Question 2"].Question),
            Answers : z.enum(
                [...Data_objects.Questions["Question 2"].Answers]
            )
        }),
        Question_3 : z.object({
            Question : z.literal(Data_objects.Questions["Question 3"].Question),
            Answers : z.enum(
                [...Data_objects.Questions["Question 3"].Answers]
            )
        }),
        Question_4 : z.object({
            Question : z.literal(Data_objects.Questions["Question 4"].Question),
            Answers : z.enum(
                [...Data_objects.Questions["Question 4"].Answers]
            )
        }),
    }) 
    
})

export const ForgotPassEmailVerification = z.object({
     Email : z.string().email({message : "Please Provide a valid Email"}),
})

export const FrogotPassOTPVerificationzodSchema = z.object({
    OTP : z.string().length(4)
})

export const ForgotPassPassChangeSchema = z.object({
     Password : z.string().min(8,{message : "Password should have more then 8 characters"}).max(80,{message : "Password should not contain more then 80 characters"})
})

export const UserPublicInfoShema = z.string({message : "Please Provide a Valid ID"})

export const Pods_Zoining_Schema = z.object({
    isPublic : z.boolean(), 
    Name : z.string({message : "Please Provide a Valid Email"}).min(3,{message : "Name should be more then 5 characters"}).max(20,{message : "Name should not consist more then 20 characters"}).optional(),
    Url : z.string().url()
}).superRefine((data, ctx) => {
    if (!data.isPublic && !data.Name) {
      ctx.addIssue({
        path: ["Name"],
        message: "Please provide a Name if a public Pod is getting created",
        code: z.ZodIssueCode.custom
      })
    }
})


export const WebsocketRequestIdValidation =z.string({message : "Please Provide a Valid Request ID"}).min(8,{message : "Please Provide a Valid Request ID"}).max(90,{message : "Please Provide a Valid Request ID"})

