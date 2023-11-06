const { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, createUserWithEmailAndPassword } = require("firebase/auth")
const { auth, firebaseAdmin } = require("../repo/firebase")
const { getProfileByEmail, saveProfile } = require("../repo/profile.repo")
const { getToken } = require("../util")
const jwt = require('jsonwebtoken')
const fs = require('fs')
var algorithm = {
    "algorithm": "RS256",
}

const privateKey = fs.readFileSync('./keys/private.key', 'utf8')
const publicKey = fs.readFileSync('./keys/public.key', 'utf8')

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password)
        // await sendEmailVerification(auth.currentUser)
        if (userCredential.user.emailVerified) {
            res.send({
                status: 'OK',
                message: 'Authorized',
                token: {
                    ...userCredential._tokenResponse,
                    idToken: sign({
                        ...(await validateFromServer(userCredential._tokenResponse.idToken)),
                        // exp: 1695222597,
                    })
                },
                // data: validateFromServer(validateFromServer(userCredential.idt))
                userData: await getProfileByEmail(username)
            })
        } else {
            res.send({
                status: 'Failed',
                message: "Email is not verified yet"
            })
        }
    } catch (error) {
        console.error(error);

        res.send({
            status: 'Failed',
            message: 'Access denied',
            token: ''
        })
    }
}

const passwordReset = async (req, res) => {
    const email = req.body.email;
    try {
        await sendPasswordResetEmail(auth, email)
        res.send({ status: "OK" })
    } catch (error) {
        res.send({
            status: 'Failed',
            message: error.message
        })
    }


}
const signup = async (req, res) => {
    let { username, password, role } = req.body;
    username = username.toLowerCase();
    try {
        if (validateEmail(username)) {
            // const data = await getProfileByEmail(username);
            const user = await createUserWithEmailAndPassword(auth, username, password);
            await sendEmailVerification(user.user)
            await saveProfile(username, '', role)
            res.send({ status: 'OK' })
        } else {
            res.send({
                status: 'Failed',
                message: "Email is not verified yet"
            })
        }
    } catch (error) {
        // res.send({
        //     status: 'Failed',
        //     message: error.message
        // })
        console.error(error)
        res.send({ status: "Failed", message: `Account with ${username} is already exists.` })

    }


}

const validate = async (req, res) => {
    try {
        const { token } = req.body
        const data = await validateLocal(token)
        if (data.email_verified) {
            res.send({
                status: "OK",
                data: data

            })
        } else {

        }
    } catch (error) {
        console.error(error+''.indexOf('jwt expired') >= 0)
        res.send({ status: "Failed", message: error })
    }
}

const sign = (data) => jwt.sign(data, privateKey, algorithm);

const validateLocal = (token) => {
    const decoded = jwt.verify(token, publicKey);
    return decoded
}
const validateFromServer = (token) => firebaseAdmin.auth().verifyIdToken(token, true);

const logout = async (req, res) => {
    try {
        const headers = req.headers
        token = getToken(headers.authorization)
        const data = await validateFromServer(token);
        await firebaseAdmin.auth().revokeRefreshTokens(data.sub, true);
    } catch (error) {
        res.send({ status: "Failed", message: error })
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const refreshToken = async (req, res) => {
    try {
        const token = req.headers.authorization.substring(7);
        let newToken;
        try {
            const result = jwt.decode(token);
            newToken = sign({
                ...result,
                exp: parseInt((Date.now()/1000)+3600),
                iat: parseInt(Date.now()/1000)
            })
        } catch (error) {
            // throw Error('invalid token, not expired')
        }
        // can be fresh with or without expire but must valid
        res.send({status: 'OK',idToken: newToken})
    } catch (error) {
        res.status(401).send({
            ...error,
            status: 'Failed',
        })
    }
}

module.exports = {
    login,
    refreshToken,
    passwordReset,
    signup, validate,
    logout, validateFromServer : validateLocal,
    validateLocal
}