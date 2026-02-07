import jwt from "jsonwebtoken";
// const New_User = new User_class()
const PERM_TOKEN_PASSWORD = process.env.PERM_TOKEN_PASSWORD || "hrfdguvigruofgruofgr";
console.log(jwt.sign({ ID: 12345432 }, PERM_TOKEN_PASSWORD));
// console.log(jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjM0NTU0MzIsImlhdCI6MTc2ODgyMTQ1OH0.ewzzbTsfUtaeyHP9Axpoju-Ei46-ybwGKZ1kVuyHNKk"))
//# sourceMappingURL=test.js.map