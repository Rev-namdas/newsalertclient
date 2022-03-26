import axios from 'axios';

// const URL = 'http://localhost:5000'
const URL = 'http://192.168.110.138:5000'

//user api
export const register = (data) => axios.post(`${URL}/user/register`, data)
export const login = (data) => axios.post(`${URL}/user/login`, data)

//alert api
export const uploadFile = (data) => axios.post(`${URL}/api/upload`, data)
export const JSONfileUpload = (data) => axios.post(`${URL}/api/jsonupload`, data, 
														{ headers: { "Content-Type": "multipart/form-data" } }
													)
export const getalerts = () => axios.get(`${URL}/api/allalerts`)
export const generateAlert = (data) => axios.post(`${URL}/api/generatealert`, data)