import * as React from 'react';

import { img_leftNav, img_rightNav } from '../../../../../../../../../../../resources/images';
import { DatePicker } from './datePicker/DatePicker';


interface FooterModel {
    currentPage : number;
    allPage : number;
    setCurrentPage : Function;
}


export const Footer = (props : FooterModel) => {

    const handlePageNavigator = () => {
        
        if (props.allPage - 1 === 0) {
            return <></>
        }
        else if (props.currentPage === 0) {

            return <img onClick={() => props.setCurrentPage((prev : number) => prev + 1)}  className='right-navigation' src={img_rightNav} alt="right"/>
        } 
        else if (props.currentPage === props.allPage - 1) {

            return <img onClick={() => props.setCurrentPage((prev : number) => prev - 1)}  className='left-navigation' src={img_leftNav} alt="left"/>
        } 
        else {
            return (
                <>
                    <img onClick={() => props.setCurrentPage((prev : number) => prev - 1)}  className='left-navigation' src={img_leftNav} alt="left"/>
                    <img onClick={() => props.setCurrentPage((prev : number) => prev + 1)}  className='right-navigation' src={img_rightNav} alt="right"/>
                </>
            )
        }
    }
    
    return (
        <div className="Footer">
            <DatePicker />
            <div className="navigation">
                {handlePageNavigator()}
            </div>
        </div>
    )
}
