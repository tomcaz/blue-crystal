const { getProfiles, getProfileByEmail, updateUserData, updateUserDataById } = require("../repo/profile.repo");
const { getToken } = require("../util");
const { validateFromServer } = require("./auth.service");

const updatePersonalInfo = async (req, res) => {
    const id = req.params.id;
    try {
        await updateUserData(id, req.body)
        res.send({
            status: 'OK',
        })
    } catch (error) {
        console.error(error)
        res.send({
            status: 'Failed',
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    res.send(`deleted ${req.params.id}`)
}

const getUser = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = await validateFromServer(getToken(authorization));
            res.send({
                status: 'OK',
                data: await getProfileByEmail(token.email)
            })
        } else
            res.send({
                status: 'FAILED', message: 'Invalid Token'
            })
    } catch (error) {
        console.error(error);
        res.send({
            status: 'Failed',
            message: error.message
        })
    }
}
const user = async (req, res) => {
    try {
        const { email } = req.params;
        const doc = await getProfileByEmail(email);
        res.send(doc);
    } catch (error) {
        console.error(error);
        res.send({
            status: 'Failed',
            message: error.message
        })
    }
}

const getVolunteers = async (req, res) => {
    try {
        const data = await getProfiles();
        res.send({
            status: 'OK',
            data: data.filter(d=> d.role !== "2" && d.role !== 2)
        })
    } catch (error) {
        console.error(error);
        res.send({
            status: 'Failed',
            message: error.message
        })
    }
}

const setVolunteerPosition = async (req, res) => {
    try {
        await updateUserDataById(req.params.id, req.body);
        res.send({ status: 'OK', message: 'User Information has been updated successfully.' })
    } catch (error) {
        console.error(error)
        res.send({
            status: 'Failed',
            message: error.message
        })
    }
}

module.exports = {
    deleteUser,
    getUser,
    setVolunteerPosition,
    updatePersonalInfo,
    user,
    getVolunteers
}