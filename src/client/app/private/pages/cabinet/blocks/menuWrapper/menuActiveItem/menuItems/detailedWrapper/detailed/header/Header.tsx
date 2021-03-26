import * as React from 'react';

import { TableView } from '../Detailed';

export interface HeaderModel {
    currentPage : number;
    allPages : number;
    togglePage : React.Dispatch<React.SetStateAction<TableView>>;
    tableView : TableView;
}

export const Header = (props : HeaderModel) => {

    const togglePageHandler = () => props.tableView === 'expenses' ? props.togglePage('payments') : props.togglePage('expenses');

    const handleActiveClassName = (className : TableView) => className === props.tableView ? 'active' : ''

    return (
        <div className="Header">
            <div className="toggler" onClick={togglePageHandler}>
                <div className={`expenses ${handleActiveClassName('expenses')}`}>Расходы</div>
                <div className={`payments ${handleActiveClassName('payments')}`}>Платежи</div>
            </div>
            <div className='pages'>{props.currentPage + 1} / {props.allPages + 1}</div>
        </div>
    )
}