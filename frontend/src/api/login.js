import { get, post } from "./fetch"

export const logout = async (token) => post('/auth/logout');
export const forgetPassword = async (email) => post('/auth/reset', { email });
export const validate = async (token) => post('/auth/validate', { token });
export const signup = async (username, password, role) => post('/auth/signup', { username, password, role });