import { IProduct } from "../../types/index";
import { IEvents } from "../base/Events";

export class CatalogModel {
  // создали класс CatalogModel
  protected items: IProduct[]; // массив, в котором будут храниться все загруженные товары
  protected selectedItem: IProduct | null; // хранение одного выбранного в данный момент товара или null - ничего не выбрано

  constructor(protected events: IEvents) {
    // конструктор принимает объект брокера событий events
    this.items = []; // список товара устанавливается как пустой массив
    this.selectedItem = null; // выбранный товар сбрасывается в null
  }

  setItems(products: IProduct[]): void {
    // метод, который принимает массив продуктов, сохраняет его в items и отправляет событие catalog:changed
    this.items = products;
  }

  getItems(): IProduct[] {
    // геттер, который возвращает текущий список товаров
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    // метод ищет товар в массиве items по его уникальному id
    return this.items.find((item) => item.id === id); // если товар найден, он возвращается,если нет - возвращается undefined
  }

  setSelectedItem(item: IProduct): void {
    // устанавливает переданный товар как выбранный
    this.selectedItem = item;
  }

  getSelectedItem(): IProduct | null {
    // возвращает текущий выбранный товар или если ничего не выбрано - null
    return this.selectedItem;
  }
}
// Этот класс выступает в роли хранилища данных о каталоге интернет-магазина.
// Он изолирует данные от интерфейса и использует брокер событий events, чтобы сообщать приложению, когда пользователь ч-т выбирает или когда список товаров обновляется
