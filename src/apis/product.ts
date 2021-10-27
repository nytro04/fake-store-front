import axios from 'axios'
import { ProductType } from '../types/ProductTypes'

const baseURL = 'https://fakestoreapi.com'

const axiosInstance = axios.create({
	baseURL,
	headers: {
		'Content-type': 'application/json',
	},
})

export const getProducts = async (): Promise<ProductType[]> => {
	try {
		const { data } = await axiosInstance.get<ProductType[]>('/products')

		return data
	} catch (error) {
		console.log(error)
		return []
	}
}
