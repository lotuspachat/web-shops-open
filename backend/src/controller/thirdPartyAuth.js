import passport from "../utils/passport.js";
import config from "../config/config.js";
import sessionModel from "../models/session.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const google_login = passport.authenticate('google', { scope: ['profile', 'email'] });

export const google_login_redirect = [
    passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:5173/login'
    }), async (req, res) => {
        const user = req.user;
        console.log(user);
        const refershToken = jwt.sign(
            {
                user: user.user_id,
                email: user.email
            },
            config.JWT_SECTITES,
            {
                expiresIn: "7d"     //"1d , 1h , 20d "
            }
        )
        const hasedRefreshToken = crypto.createHash("sha256").update(refershToken).digest("hex");

        let session = await sessionModel.findOne({ user_id: user.user_id });
        if (session) {
            // session.user_id = user.user_id;
            // session.refershToken = hasedRefreshToken;
            // session.ip = req.ip;
            // session.userAgent = req.headers["user-agent"];
            // await session.save();
            session.refershToken = hasedRefreshToken;
            session.ip = req.ip;
            session.userAgent = req.headers["user-agent"];
            await session.save();
        }
        else {
            session = await sessionModel.create(
                {
                    user_id: user.user_id,
                    refershToken: hasedRefreshToken,
                    ip: req.ip,
                    userAgent: req.headers["user-agent"]
                }
            )
        }
        const acessToken = jwt.sign({
            id: user._id,
            sessionId: session.user_id
        },
            config.JWT_SECTITES,
            {
                expiresIn: "7m"     //"1d , 1h , 20d "
            }
        )
        res.cookie("refreshToken", refershToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        // res.status(201).json(
        //     {
        //         message: "User request sussesfully",
        //         user: {
        //             username: user.username,
        //             email: user.email,
        //             photo : user.profile_photo
        //         },
        //         ok : true,
        //         acesstoken: acessToken
        //     }
        // )   
        res.redirect(`http://localhost:5173/loginSucess?acessToken=${acessToken}`);
    }
]