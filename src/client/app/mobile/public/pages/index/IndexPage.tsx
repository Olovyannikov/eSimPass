import * as React from 'react';
import { Banner } from './blocks/banner/Banner';
import { Chooser } from './blocks/chooser/Chooser';
import { Download } from './blocks/download/Download';
import { Header } from './blocks/header/Header';

export const IndexPage = () => {

    return (
        <div className="IndexPage">
            <Banner />
            <Header />
            <Chooser />
        </div>
    )
}
