import axios from "axios";
import {headersToken} from "../../app/token/token";

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	headers: headersToken
});