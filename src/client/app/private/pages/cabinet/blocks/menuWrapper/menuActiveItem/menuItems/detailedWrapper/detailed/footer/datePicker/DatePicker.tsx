import * as React from 'react';

import { Button } from '../../../../../../../../../../components/buttons/Button';

export const DatePicker = () => {

    const [showDetailed, setShowDetailed] = React.useState<boolean>(false);

    const orderDetalization = () => {
        if (showDetailed) {
            return (
                <input type="date"/>
            )
        }
    }

    const handleOrderDetailed = () => setShowDetailed(prev => prev = true)

    return (
        <div className="DatePicker">
            <Button func={handleOrderDetailed} text='Заказать детализацию' className='order-detail' />
            {orderDetalization()}
        </div>
    )
}
