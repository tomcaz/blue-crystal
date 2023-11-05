const { collection, getDocs, getDoc, doc, query, setDoc, updateDoc, where, deleteDoc, getCountFromServer } = require("firebase/firestore");
const { firestoreDB } = require("./firebase");

const orgsCollection = collection(firestoreDB, "orgs");
const userCollection = collection(firestoreDB, "users");
const eventCollection = collection(firestoreDB, "events");

const getOrgs = async (id) => {
    return (await getDocs(
        (id !== 'global') ?
            query(orgsCollection, where("owner", "==", doc(userCollection, id)))
            :
            orgsCollection)
    ).docs.map(doc => ({ ...doc.data(), id: doc.id, owner: id }));
}

const getOrg = async (id) => {
    let docRef = (await getDoc(doc(orgsCollection, id)));
    data = {
        ...docRef.data(),
        id: docRef.id,
        owner: docRef.data().owner.id
        // participants: (await getCountFromServer(query(userCollection, where('orgs', 'array-contains', docRef.id)))).data().count
    }
    return data;
}

const saveOrg = async (organization) => {
    let docRef = doc(orgsCollection);
    await setDoc(docRef, {
        ...organization,
        owner: doc(userCollection, organization.owner)
    });
    return docRef.id
}

const updateOrgData = async (id, organization) => {
    let payload =  {...organization}
    if(organization.owner && organization.owner != null){
        payload.owner = doc(userCollection, organization.owner)
    }
    const docRef = doc(orgsCollection, id);
    await updateDoc(docRef, payload);
    return docRef.id;
}

const getOrgsByVolunteer = async (id) => {
    const orgs = (await getDocs(orgsCollection)).docs.filter(doc=> doc.data().rank && doc.data().rank[id]).map(doc=> ({
        rank: doc.data().rank[id],
        name: doc.data().name,
        id: doc.id
    }));
    return orgs
}

const joinEventRepo = async (userId, id) => {
    const docRef = await getDoc(doc(eventCollection, id));
    let { participantsList } = docRef.data();
    if (participantsList) {
        if (participantsList.indexOf(userId) < 0) {
            participantsList = [...participantsList, userId]
        }
    } else {
        participantsList = [userId];
    }
    await updateDoc(docRef.ref, { participantsList })
}

const saveEventRepo = async (id, data) => {
    let docRef;
    if (!id || id === null)
        docRef = doc(eventCollection);
    else
        docRef = doc(eventCollection, id);
    await setDoc(docRef, { ...data, createdAt: new Date() })
    return docRef.id
}

const getEventList = async (id) => {
    if (id && id !== null)
        return (await getDocs(query(eventCollection, where('organization', '==', id)))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
    else
        return (await getDocs(eventCollection)).docs.map(doc => ({ ...doc.data(), id: doc.id }));

}
const getEventListJoined = async (id) => {
    if (id && id !== null)
        return (await getDocs(query(eventCollection, where('participantsList', 'array-contains', id)))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
    else
        return (await getDocs(eventCollection)).docs.map(doc => ({ ...doc.data(), id: doc.id }));

}

const getVolunteerById = async (id) => {
    return (await getDoc(doc(volunteerC, id))).data();
}

const getEventDetail = async (id) => {
    let data = (await getDoc(doc(eventCollection, id))).data();
    return data;
}

const deleteEventData = async (id) => {
    deleteDoc(doc(eventCollection, id));
}

module.exports = { getOrg, getOrgs, getOrgsByVolunteer, saveOrg, updateOrgData, saveEventRepo, getEventList, getEventListJoined, getEventDetail, deleteEventData, joinEventRepo }
