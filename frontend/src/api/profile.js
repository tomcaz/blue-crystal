import { deleteCall, get, post, put } from "./fetch"

export const getUserInfo = async() =>  get('/profile');
export const updateAccount = async(id, data) => put(`/profile/${id}`, data);
export const resetPassword = async(email) =>  post('/auth/reset', {email});
export const getChildInfo = async(childId) => get(`/children/child/${childId}`)
export const getChildrenList = async(parentId) => get(`/children/${parentId}`)
export const saveChild = async(parentId, childrenData) => post(`/children/${parentId}`, childrenData)
export const updateChild = async(childId, childrenData) => put(`/children/${childId}`, childrenData)
export const deleteChild = async(childId, childrenData) => deleteCall(`/children/${childId}`)