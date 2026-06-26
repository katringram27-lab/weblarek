import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { CatalogModel } from "./components/Models/CatalogModel";
import { CartModel } from "./components/Models/CartModel";
import { BuyerModel } from "./components/Models/BuyerModel";
import { IProduct, IOrder, IOrderResult, IProductsResponse, TPayment } from "./types/index";
import { apiProducts } from "../src/utils/data";
import { AppApi } from "./components/Models/AppApi";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const events = new EventEmitter(); // создаем объект брокера событий eventsF

const catalogModel = new CatalogModel(events); // cоздаем экземпляр класса Catalog

catalogModel.setItems(apiProducts.items); // устанавливаем товары из apiProducts

const items = catalogModel.getItems(); // получаем товары из каталога
console.log("Массив товаров из каталога: ", catalogModel.getItems());

const itemId = "854cef69-976d-4c2a-a18c-2aa45046c390"; // получаем товар по ID
//console.log("Товар с ID: ", catalogModel.);

const productById = catalogModel.getItemById(itemId);
if (productById) {
  catalogModel.setSelectedItem(productById); // устанавливаем выбранный товар
}
console.log("Товар с ID: ", itemId, ":", productById);

const selectedItem = catalogModel.getSelectedItem(); // получили выбранный товар из каталога
console.log("Выбранный товар:", selectedItem);

const cartModel = new CartModel(events); // создаем экземпляр класса Cart

console.log("Текущие товары в корзине:", cartModel.getItems()); // вывели текущие товары в корзине

const newItem: IProduct = {
  id: "", //b06cde61-912f-4663-9751-09956c0eed67",
  description: "", //Будет стоять над душой и не давать прокрастинировать.",
  image: "", ///Asterisk_2.svg",
  title: "", //Мамка-таймер",
  category: "", //софт-скил",
  price: null, // number
};

cartModel.addItem(newItem); // добавляем новый товар
console.log(
  "Обновленные товары в корзине после добавления нового товара:",
  cartModel.getItems(),
);

cartModel.removeItem(apiProducts.items[0].id); // удаляем товар по его ID из корзины
console.log(
  "Обновленные товары в корзине после удаления товара:",
  cartModel.getItems(),
);

cartModel.clearCart(); // очищаем корзину
console.log("Товары в корзине после очистки:", cartModel.getItems());

apiProducts.items.forEach((item) => cartModel.addItem(item)); // добавляем несколько товаров
console.log(
  "Товары в корзине после добавления нескольких товаров:",
  cartModel.getItems(),
);

console.log("Общая стоимость товаров в корзине:", cartModel.getTotal()); // получаем общую сумму товаров в корзине

console.log("Количество товаров в корзине:", cartModel.getCount()); // получаем количество товаров в корзине

const exists = cartModel.contains(apiProducts.items[1]?.id); // проверяем содержит ли корзина товар с определенным ID
console.log(
  `Содержит ли корзина товар с id ${apiProducts.items[1]?.id}:`,
  exists,
);

const buyerModel = new BuyerModel(events); // создаем экземпляр класса Buyer
console.log("Текущие данные покупателя:", buyerModel.getData()); // выводим текущие данные покупателя

const apiBuyer = {
  // пример данных покупателя
  payment: "card",
  email: "",
  phone: "",
  address: "",
};

buyerModel.setData({
  // устанавливаем новые данные для покупателя
  payment: "card", //"card",
  email: "", //"kirill67_44@yandex.ru",
  phone: "", //"+7 (900) 554-44-00",
  address: "", //"143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44'"
});

console.log("Обновленные данные покупателя:", buyerModel.getData()); // обновляем данные покупателя после установки новых данных

buyerModel.clearData(); // очищаем данные покупателя
console.log("Данные покупателя после очистки:", buyerModel.getData());

function testValidation() {
  const emptyValidationResults = buyerModel.validateAll();
  console.log(
    "Результаты проверки всех полей при пустых данных: ",
    emptyValidationResults,
  );

  const filledBuyerData = {
    //email: 'kirill67_44@yandex.ru',
    address: "143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44",
    phone: "+7 (900) 554-44-00",
    payment: "card" as TPayment,
  };
  buyerModel.setData(filledBuyerData);

  const filledValidationResults = buyerModel.validateAll();
  console.log(
    "Результат проверки всех полей при заполненных данных: ",
    filledValidationResults,
  );
}
testValidation();

const apiService = new Api(API_URL);
const appApi = new AppApi(apiService);

const order: IOrder = {
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
  payment: "card",
  total: 2200,
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
};

(async () => {
  try {
    const productsResponse: IProductsResponse = await appApi.getProducts();
    const products: IProduct[] = productsResponse.items;
    console.log("Каталог товаров: ", products);
  } catch (error) {
    console.log("Возникли проблемы с сервером при получении товаров: ", error);
    //throw error;
  }

  try {
    const orderResult: IOrderResult = await appApi.postOrder(order);
    console.log("Результат заказа: ", orderResult);
  } catch (error) {
    console.log("Возникли проблемы с сервером при отправке заказа: ", error);
    //throw error;
  }
})();
