import { IBuyer } from "../../types/index";
import { IEvents } from "../base/Events";
import { TPayment } from "../../types/index";
//import { Errors } from "../../types/index";

type BuyerValidationErrors = {
  [key in keyof IBuyer]?: string;
};

export class BuyerModel {
  // создаем класс BuyerModel
  protected payment: TPayment | null; // св-ва для хранения данных заказа.Способ оплаты может принимать 2 значения: card или cash
  protected email: string;
  protected phone: string;
  protected address: string;

  constructor(protected events: IEvents) {
    // принимаем брокер событий events, чтобы модель могла оповещать др части приложения об изменениях
    this.payment = null; // инициализируем данные null для оплаты
    this.email = ""; // инициализируем данные пустыми строками
    this.phone = "";
    this.address = "";
  }

  setData(data: Partial<IBuyer>): void {
    // принимаем частичные данные покупателя.Если новое значение передано,оно обновляет текущее состояние
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
  }

  getData(): IBuyer {
    // возвращаем текущий объект со всеми данными покупателя
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clearData(): void {
    // сбрасываем все поля до пустых значений null
    this.payment = null;
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validateAll(): BuyerValidationErrors {
    // возвращаем объект с ошибками
    const errors: BuyerValidationErrors = {}; // создаем объект,который будет хранить ошибки

    if (!this.email || this.email.trim() === "") {
      // проверяем поля на валидность
      errors.email = "Укажите email";
    }
    if (!this.phone || this.phone.trim() === "") {
      errors.phone = "Укажите номер телефона";
    }
    if (!this.address || this.address.trim() === "") {
      errors.address = "Укажите адрес";
    }
    if (!this.payment) {
      // если значение не указано-добавляем сообщение об ошибке
      errors.payment = "Выберите способ оплаты";
    } else if (this.payment !== "card" && this.payment !== "cash") {
      // если значение - 'card' или 'cash'-ничего не делаем, если некорректно- сообщение об ошибке
      errors.payment = "Выберите корректный способ оплаты";
    }

    return errors; // если в объекте errors есть ошибки-возвращвем сам объект
  }
}
// Этот класс содержит данные покупателя, которые тот должен указать при оформлении заказа и сообщает Презентеру,
// когда эти данные меняются или их нужно проверить перед отправкой заказа
