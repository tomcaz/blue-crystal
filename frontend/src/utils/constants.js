export const TYPE_PARENT = 0;
export const TYPE_VOLUNTEER = 1;
export const TYPE_ORGANIZATION = 2;

export const isUserRole = (role, type) => role * 1 === type;

export const isEmptyObject = (object) => !object || (Object.keys(object).length === 0 && object.constructor === Object)
export const isEmptyString = (string) => !string || string === null || string.trim() === '' 
