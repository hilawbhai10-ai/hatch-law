import nodemailer from "nodemailer";

async function sendotp(otp: number, email: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bhushanritik23@gmail.com",
            pass: "nydvlrarbemojtjv", 
        },
    });

    const mailOptions = {
        from: "bhushanritik23@gmail.com",
        to: email,
        subject: "OTP verification",
        text: `The otp is ${otp}`,
        html: `The otp is ${otp}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions); 
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

export default sendotp;
