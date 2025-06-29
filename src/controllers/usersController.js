const prisma = require("../../prisma")
const {getAccessToken, getRefreshToken, verifyToken } = require("../utils/token")
const { generateSalt, encryptPassword, validatePassword } = require("../utils/hashPassword")


exports.signup = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password", data: null });
        }
        const existedUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existedUser) {
            return res.status(400).json({ success: false, message: "User already exists", data: null });
        }
        const salt = generateSalt()
        const user = await prisma.user({
            data: {
                email,
                password: encryptPassword(password, salt),
                salt: salt
            }
        })
        delete user.password
        delete user.id
        delete user.salt
        const access_token = getAccessToken(user)
        const refresh_token = getRefreshToken(user)
        if (!access_token || !refresh_token) {
            return res.status(401).json({
                success: false,
                message: "unable to generate access token or refresh token",
                data: null
            })
        }
        const token = await prisma.refresh_token.create({
            data:{
                userId: user.id,
                token: refresh_token
            }
        })
        await prisma.user.update({
            where:{
                id: user.id,
                refreshTokenId: token.id
            }
        })
        res.status(200).cookie("token", access_token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            access_token,
            refresh_token,
            message: "Successfully registered! Welcome to PetPals",
            data: null
        })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, data: null });
    }
}

exports.refreshAccessToken = async (req, res) => {
    try{

        const token = req.body.token
        if(!token){
            return res.status(400).json({ success: false, message: "refresh token not existed", data: null });
        }
        const user = verifyToken(token, process.env.REFRESH_TOKEN_SECRET)
        const existedUser = await prisma.$transcation(async (prismadb)=>{
            return prismadb.user.findUnique({
                where:{
                    email: user.email
                }
            }).catch((err)=>{
                console.log(err)
                throw err
            })
        })
        if(!existedUser){
            return res.status(400).json({ success: false, message: "user not existed", data: null });
        }

        const access_token = getAccessToken(user)
        res.status(200).cookie("token", access_token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            access_token,
            message: "Refresh successfully",
            data: null
        })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, data: null });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "missing email or password",
                data: null
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
                data: null
            })
        }

        if (!validatePassword(password, user.salt, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid password. Please try again",
                data: null
            })
        }

        delete user.password
        delete user.id
        delete user.salt

        const access_token = getAccessToken(user)
        const refresh_token = getRefreshToken(user)
        if (!access_token || !refresh_token) {
            return res.status(401).json({
                success: false,
                message: "unable to generate access token or refresh token",
                data: null
            })
        }
        await prisma.refresh_token.create({
            data:{
                userId: user.id,
                token: refresh_token
            }
        })
        await prisma.user.update({
            where:{
                id: user.id,
                refreshTokenId: token.id
            }
        })
        res.status(200).cookie("token", access_token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000), httpOnly: true }).json({
            success: true,
            access_token,
            refresh_token,
            message: "Login successfully! Welcome!",
            data: null
        })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, data: null });
    }

}