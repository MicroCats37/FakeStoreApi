import { getLocalStorageItem } from '../utils/getcookies';

function getAuth(): boolean {
    const authToken = getLocalStorageItem('authToken');
    return authToken ? true : false;
}

export default getAuth;