const { getChild, getChildList, saveChild, updateChild, deleteChild } = require("../repo/children.repo")
const { getUserRefByEmail } = require("../repo/profile.repo")

const child = async(req,res) =>{
    const { id } = req.params
    try {
        const data = await getChild(id)
        res.send({status: 'OK', data: {...data.data(), parent: data.data().parent.id, id: data.id}})
    } catch(error) {
        console.error(error)
        res.send({status: 'FAILED', error})
    }
} 
const childrenList = async(req,res) =>{
    const { id } = req.params
    try {
        const data = await getChildList(id)
        res.send({status: 'OK', data: data.docs.map(doc=> ({...doc.data(), parent: doc.data().parent.id, id: doc.id}))})
    } catch(error) {
        console.error(error)
        res.send({status: 'FAILED', error})
    }
} 

const saveChildren = async(req,res) =>{
    const id = req.params.id
    try {
        await saveChild(id, req.body)
        res.send({status: 'OK'})
    } catch(error) {
        console.error(error)
        res.send({status: 'FAILED', error})
    }
} 
const updateChildren = async(req,res) =>{
    const { childId } = req.params
    try {
        await updateChild(childId, req.body)
        res.send({status: 'OK'})
    } catch(error) {
        console.error(error)
        res.send({status: 'FAILED', error})
    }
} 
const deleteChildren = async(req,res) =>{
    const childId = req.params.id
    try {
        await deleteChild(childId)
        res.send({status: 'OK'})
    } catch(error) {
        console.error(error)
        res.send({status: 'FAILED', error})
    }
} 

module.exports = {
    child,
    childrenList,
    saveChildren,
    updateChildren,
    deleteChildren
}