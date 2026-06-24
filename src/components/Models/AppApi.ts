import { IApi, IOrder, IOrderResult, IProductsResponse } from "../../types/index";

export class AppApi {
  // создаем класс AppApi

  protected api: IApi; // переменная api хранит экземпляр базового класса

  constructor(api: IApi) {
    // конструктор принимает этот базовый api  и сохраняет его внутрь нашего класса
    this.api = api;
  }

  getProducts(): Promise<IProductsResponse> {
    // getProducts асинхронный метод для загрузки каталога товаров
    return this.api.get<IProductsResponse>("/product"); // отправляем GET-
  }
  
  postOrder(order: IOrder): Promise<IOrderResult> {
    // postorder асинхронный метод для оформления заказа, принимает данные заказа
    return this.api.post<IOrderResult>("/order", order);
  }
}
