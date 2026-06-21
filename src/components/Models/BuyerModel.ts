import { IBuyer } from "../../types/index";
import { IEvents } from "../base/Events";

export class BuyerModel { // создаем класс BuyerModel
    protected payment: 'online' | 'cash'; // св-ва для хранения данных заказа.Способ оплаты может принимать 2 значения: online или cash
    protected email: string;
    protected phone: string;
    protected address: string;

    constructor(protected events: IEvents) { // принимаем брокер событий events, чтобы модель могла оповещать др части приложения об изменениях
        this.payment = 'online'; // инициализируем данные дефолтным online для оплаты
        this.email = ''; // инициализируем данные пустыми строками
        this.phone = '';
        this.address = '';
    }

    setData(data: Partial<IBuyer>): void { // принимаем частичные данные покупателя.Если новое значение передано,оно обновляет текущее состояние
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;

    this.events.emit('buyer:changed', this.getData()); //после обновления генерируется событие buyer:changed ,сигнализируя,что данные изменились
    }

    getData(): IBuyer { // возвращаем текущий объект со всеми данными покупателя
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    clearData(): void { // сбрасываем все поля до пустых значений,дефолтного online 
        this.payment = 'online';
        this.email = '';
        this.phone = '';
        this.address = '';

        this.events.emit('buyer:changed', this.getData()); // оповещаем приложение об изменениях
    }

    validateField(field: keyof IBuyer, value: string): string | null { // проверяем одно конкретное поле
        switch (field) {
            case 'email':
                if (!value || value.trim() === '') return "Email не может быть пустым"; // если поле пустое,возвращается сообщение об ошибке
                return null;

                case 'address':
                    if (!value || value.trim() === '') return "Необходимо указать адрес";
                    return null;
                    case 'payment':
                        if (!value) return "Способ оплаты не выбран";
                        if (value !== 'online' && value !== 'cash') { // дополнительно проверяем,чтобы значение было строго online или cash
                            return "Выберите корректный способ оплаты";
                        }
                        return null;

                        default:
                            return null; // если ошибок нет,возвращаем null
        }
    }

    validateAll(): Partial<Record<keyof IBuyer, string>> { // проверка всех полей сразу,собирает ошибки в объект и возвращает его.Если ошибок нет,вернется пустой объект
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        const emailError = this.validateField('email', this.email);
        if (emailError) errors.email = emailError;

        const phoneError = this.validateField('phone', this.phone);
        if (phoneError) errors.phone = phoneError;

        const addressError = this.validateField('address', this.address);
        if (addressError) errors.address = addressError;

        const paymentError = this.validateField('payment', this.payment);
        if (paymentError) errors.payment = paymentError;

        return errors;
    }
}
// Этот класс содержит данные покупателя, которые тот должен указать при оформлении заказа и сообщает Презентеру,
// когда эти данные меняются или их нужно проверить перед отправкой заказа