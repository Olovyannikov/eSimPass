import * as React from 'react';

import leftNav from '../../../../../../../img/left-nav.png';
import rightNav from '../../../../../../../img/right-nav.png';

import { Button } from '../../../../../../components/buttons/Button';

interface INavigation {
    currentPage : number;
    allPage : number;
    setCurrentPage :  Function;
}

interface ShowButton {
    left : boolean;
    right : boolean;
}

export const DetailAndNavigation = ({currentPage, allPage, setCurrentPage} : INavigation) => {

    const [showButtons, setShowButtons] = React.useState<ShowButton>({
        left : false,
        right : true
    })
    
    React.useEffect(() => {
        if (currentPage === 0) {
            setShowButtons({
                left : false,
                right : true
            })
        } else if (currentPage === allPage - 1) {
            setShowButtons({
                left : true,
                right : false
            })
        } else {
            setShowButtons({
                left : true,
                right : true
            })
        }
    }, [currentPage])




    return (
        <div className="DetailAndNavigation">
            <Button text='Заказать детализацию' className='order-detail' />
            <div className="detailAndNavigation__navigation">
                {showButtons.left ? (<img onClick={() => setCurrentPage((prev : number) => prev - 1)}  className='left-navigation' src={leftNav} alt="left"/>) : null}
                {showButtons.right ? (<img onClick={() => setCurrentPage((prev : number) => prev + 1)}  className='right-navigation' src={rightNav} alt="right"/>) : null}
            </div>
        </div>
    )
}
