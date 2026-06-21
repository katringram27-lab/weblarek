import { IApi, IProduct, IOrder, IOrderResult, IProductsResponse } from "../../types/index";

export class AppApi { // создаем класс AppApi

    protected api: IApi; // переменная api хранит экземпляр базового класса

    constructor(api: IApi) { // конструктор принимает этот базовый api  и сохраняет его внутрь нашего класса
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> { // getProducts асинхронный метод для загрузки каталога товаров
        try {
            const response = await this.api.get<IProductsResponse>('/product'); // отправляем GET-запрос на эдпоинт /product, ожидаем ответ с типом IProductsResponse
            return response.items; // возвращаем массив товаров
        } catch(error) { // если сервер недоступен или произошла ошибка
            console.log("Возникли проблемы с сервером при получении товаров:", error); // выводится ошибка в консоль
            throw error;
        }
    }

    async postOrder(order: IOrder): Promise<IOrderResult> { // postorder асинхронный метод для оформления заказа, принимает данные заказа
        try {
            const result = await this.api.post<IOrderResult>('/order', order); // делает POST-запрос на адрес /order,передавая данные покупателя и корзины
            return result // возвращает положительный результат
        } catch(error) {
            console.log("Возникли проблемы с сервером при отправке заказа:", error); // выводится ошибка в консоль
            throw error;
        }
    }
}