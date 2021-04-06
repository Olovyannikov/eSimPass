/// <reference path="./resources/images.d.ts" />

import * as React from "react";
import { render } from "react-dom";
import "./index.scss"
import { Provider } from "react-redux";

import { STORE } from "./redux/StateApi"
import { Application } from "./app/Application";
render(<Provider store={STORE}><Application/></Provider>, document.getElementById("root"));
