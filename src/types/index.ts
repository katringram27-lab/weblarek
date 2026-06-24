export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'; // создаем тип, который принимает 3 строковыз значения:отправка, обновление и удаление данных на сервере

export interface IApi {
    get<T extends object>(uri: string): Promise<T>; // метод для получения данных. Принимает uri и возвращает промис с объектом типа Т
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>; // метод для отправки данных.Принимает адрес,тело запроса(data) и необязат параметр method(1 из 3х) и возвращает промис
}

export interface IProduct { // интерфейс,описывающий структуру товара в каталоге
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

type TPayment = 'card' | 'cash' // TPayment-тип,ограничивающий способ оплаты

export interface IBuyer { // интерфейс,описывающий личные данные покупателя
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export interface IProductsResponse { // ответ сервера при получении списка товаров
    items: IProduct[]; // массив объектов
    total: number; // общее кол-во товаров
}

export interface IOrder extends IBuyer { // данные для отправки заказа
    items: string[]; // массив id товаров
    total: number; // общая сумма заказа
}

export interface IOrderResult { // ответ сервера после отправки заказа
    id: string; // идентификатор заказа
    total: number; // итоговая сумма
}
