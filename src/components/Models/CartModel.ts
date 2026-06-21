import { IProduct } from "../../types/index";
import { IEvents } from "../base/Events";


export class CartModel { // создали класс CartModel

    protected items: IProduct[] // массив, хранящий товары в корзине

    constructor(protected events: IEvents) { //передаем в корзину менеджер событий events 
        this.items = []; // список товаров сбрасываем в пустой массив
    }

    getItems(): IProduct[] { // возвращаем текущий массив всех товаров, добавленных в корзину
        return this.items;
    }

    addItem(item: IProduct): void { // добавляем новый товар в конец массива items
        this.items.push(item);
        this.events.emit('cart:changed', {items: this.items}); // вызываем событие cart:changed, передавая обновленный список товаров
    }

    removeItem(id: string): void { // фильтруем массив, оставляя только те товары, у которых id не совпадает с переданнымю Товар с нужным id удаляется
        this.items = this.items.filter(item => item.id !== id);
        this.events.emit('cart:changed', {items: this.items}); // отправляем событие cart:changed
    }

    clearCart(): void { // очистка корзины
        this.items = []; // чистим корзину, сбрасывая items до пустого массива
        this.events.emit('cart:changed', {items: this.items}); // оповещаем, что корзина пуста
    }

    getTotal(): number { // вычисляем общую стоимость всех товаров в корзине
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0); // метод reduce суммирует цены каждого товара. Если цена отсутствует undefined или null, используем ?? 0 для защиты от ошибок
    }

    getCount(): number { // возвращаем общее кол-во товаров в корзине
        return this.items.length;
    }

    contains(id: string): boolean { // проверяем,есть ли в корзине товар с указанным id. Метод some возвращает true, если хотя бы один товар найден, иначе - false
        return this.items.some(item => item.id === id);
    }
}
// Этот класс выступает в роли хранилища массива товаров, выбранных покупателем для покупки