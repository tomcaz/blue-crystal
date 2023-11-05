const { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, createUserWithEmailAndPassword } = require("firebase/auth")
const { auth, firebaseAdmin } = require("../repo/firebase")
const { getProfileByEmail, saveProfile } = require("../repo/profile.repo")
const { getToken } = require("../util")

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password)
        // await sendEmailVerification(auth.currentUser)
        if (userCredential.user.emailVerified) {
            res.send({
                status: 'OK',
                message: 'Authorized',
                token: userCredential._tokenResponse,
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

        const { token } = req.body;
        const data = await validateFromServer(token)
        if (data.email_verified) {
            res.send({ status: "OK", data: data })
        } else {

        }
    } catch (error) {
        res.send({ status: "Failed", message: error })
    }
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


const refreshToken = async (req, res) => { }

module.exports = {
    login,
    refreshToken,
    passwordReset,
    signup, validate,
    logout, validateFromServer
}