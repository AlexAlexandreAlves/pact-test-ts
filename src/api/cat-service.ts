import axios, { AxiosPromise } from 'axios';

export class CatService {
  private url: string;

  constructor(endpoint: any) {
    this.url = endpoint.url;
  }

  public getCats = (from: string): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      params: { from },
      headers: { Accept: 'application/json' },
      method: 'GET',
      url: '/cats',
    });
  };

  public getCatsById = async (id: number): AxiosPromise => {
    return await axios.request({
      baseURL: this.url,
      headers: { Accept: 'application/json' },
      method: 'GET',
      url: `/cats/${id}`,
    });
  };

  public createCat = async (catData: object): AxiosPromise => {
    return await axios.request({
      baseURL: this.url,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      url: `/cats`,
      data: catData,
    });
  };

  public updateCat = async (id: number, catData: object): AxiosPromise => {
    return await axios.request({
      baseURL: this.url,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'PUT',
      url: `/cats/${id}`,
      data: catData,
    });
  };

  public deleteCat = async (id: number): AxiosPromise => {
    return await axios.request({
      baseURL: this.url,
      headers: { Accept: 'application/json' },
      method: 'DELETE',
      url: `/cats/${id}`,
    });
  };
}
