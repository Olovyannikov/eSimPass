import * as React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '../../../../../../../../../../components/buttons/Button';

export const OrderDetalization = () => {

    const [showDetailed, setShowDetailed] = React.useState<boolean>(false);
    const [startDate, setStartDate] = React.useState<Date>(null);
    const [endDate, setEndDate] = React.useState<Date>(null);
    const [order, setOrder] = React.useState<boolean>(false)

    const orderDetalizationInput = () => {
        if (showDetailed) {
            return (
                <DatePicker
                    selected={startDate}
                    onChange={handleChangeDate}
                    startDate={startDate}
                    endDate={null}
                    className='date-picker'
                    selectsRange
                    shouldCloseOnSelect={false}
                    value={inputDatePickerValue()}
                />
            )
        }
    }

    const inputDatePickerValue = () => {
        if (startDate) {

            if (startDate && endDate) {
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            }
            
            return `${startDate.toLocaleDateString()} -  До `
        }
        else {
            return 'Выберите дату'
        }
    }

    const handleChangeDate = (dates : [Date, Date]) => {
        const [start, end] = dates;
        setStartDate(prev => prev = start);
        setEndDate(prev => prev = end);
      };


    const handleOrderDetailed = () => {
        setShowDetailed(prev => prev = !prev)

        if (startDate && endDate) {
            setOrder(prev => prev = true)
        }
    } 

    const renderSuccessfullOrder = () => {
        if (order) {
            return <Button text='Детализация отправлена на Вашу почту!' className='send-detailed' />
        }
        else {
            return <Button func={handleOrderDetailed} text='Заказать детализацию' className='order-detail' />
        }
    }


    return (
        <div className="OrderDetalization">
            {renderSuccessfullOrder()}
            {orderDetalizationInput()}
        </div>
    )
}
