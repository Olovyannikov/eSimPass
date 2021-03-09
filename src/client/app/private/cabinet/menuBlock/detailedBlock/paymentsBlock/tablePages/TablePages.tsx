import * as React from 'react';

export interface ITablePages {
    currentPage : number;
    allPage : number;
} 

export const TablePages = ({currentPage, allPage} : ITablePages) => {
    return (
        <div className="TablePage">
            {currentPage} / {allPage}
        </div>
    )
}
