import React from "react";
import Header from "../../components/layout/header/header";
import {Outlet} from "react-router";

export function Main() {
    return(
        <div>
            <Header />
            <Outlet />

  
        </div>
    );
}
