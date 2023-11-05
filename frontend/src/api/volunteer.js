import { get, post, put } from "./fetch"

export const getVolunteerList = async () => get(`/orgs/volunteer`);
export const getOrgsByVolunteer = async (id) => get(`/orgs/volunteer/${id}`);