import React from "react";
import Nodata from '../../assets/No data-cuate.png';
import './EmptyPage.css';
import {NavLink} from "react-router-dom"; // Import your CSS file with the centered-image class

function EmptyPage() {
    return (

        <div style={{ paddingTop: '300px' }}>
            <div className="position-relative" style={{height:"450px"}}>
                <div className="position-absolute top-50 start-50 translate-middle">
                <h2 style={{paddingLeft:"150px"}}>No Data Found</h2>
                <img style={{height:"500px"}} src={Nodata}
                />

                </div>
            </div>
        </div>

    );
}

export default EmptyPage;
