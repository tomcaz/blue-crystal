import { get, post, put } from "./fetch"

export const getOrgList = async(id) =>  get(`/orgs/orgs/${id}`);
export const getOrg = async(id) =>  get(`/orgs/org/${id}`);
export const saveOrg = async(data) =>  post('/orgs', data);
export const updateOrg = async(id, data) =>  put(`/orgs/${id}`, data);