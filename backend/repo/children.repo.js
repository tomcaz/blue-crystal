const { getDocs, collection, query, where, setDoc, doc, getDoc, updateDoc, deleteDoc } = require("firebase/firestore");
const { firestoreDB } = require("./firebase");

const userCollection = collection(firestoreDB, "users");
const childrenCollection = collection(firestoreDB, "children");

const saveChild = async (parent, data) => {
    let docRef = doc(childrenCollection);
    setDoc(docRef, {
        ...data,
        parent: doc(userCollection, parent), createdAt: new Date()
    })
}

const updateChild = async (childId, data) => {
    let docRef = doc(childrenCollection, childId);
    updateDoc(docRef, data)
}

const deleteChild = async (childId) => {
    let docRef = doc(childrenCollection, childId);
    deleteDoc(docRef)
}

const getChildList = async (parentId) => {
    const q = query(childrenCollection, where('parent', '==', doc(userCollection, parentId)));
    return getDocs(q)
}
const getChild = async (childId) => {
    const q = doc(childrenCollection, childId);
    return getDoc(q)
}

module.exports = { getChildList, saveChild, updateChild, deleteChild, getChild }