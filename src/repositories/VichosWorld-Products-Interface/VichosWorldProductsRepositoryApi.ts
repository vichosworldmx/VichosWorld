import axios, { AxiosInstance } from "axios";
import { Product } from "../../domain/entities/products";
import { GlobalResponse } from "../../infrastructure/interfaces/vichosWorld-interface.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export class VichosWorldProductsRepositoryApi{
  private axiosInstance: AxiosInstance
 
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    this.axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      // error => {
      //   if (isNetworkError(error)) {
      //     throw new NetworkError()
      //   } else {
      //     console.error('Error from interceptors///: ', error);
      //     // return error.response
      //     return Promise.reject(error);
      //   }
      // },
    )

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = import.meta.env.VITE_APP_TOKEN;

        if (token) {
          config.headers['authorization'] = `${token}`;
        }
        return config;
      }
    );

  }

  async getProductsStock(): Promise<Product[] | null> {
    console.log('getProductsStock')

    try {
      const response = await this.axiosInstance.get<GlobalResponse>(`/v1/report/productsstock`);

      // if (isResponseError(response)) {
      //   handleDomainError(response.data.code)

      //   throw new UnknownError(response.data.message)
      // }
      const body = JSON.parse(response.data.body);
      console.log('body 11', body)
      const products = body.map(ProductMapper.vichosWorldProductToEntity);
      console.log('products 11', products)
      return products;

    } catch (error) {
      console.log('error getProductsStock', error);
      throw new Error(`Error getting products stock`);
    }
  }
  
}

export const vichosWorldProductsRepositoryApi = new VichosWorldProductsRepositoryApi()