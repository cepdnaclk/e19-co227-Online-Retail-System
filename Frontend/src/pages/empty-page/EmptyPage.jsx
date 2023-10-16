import React from "react";
import Nodata from '../../assets/No data-cuate.png';
import './EmptyPage.css'; // Import your CSS file with the centered-image class

function EmptyPage() {
    return (
        <div className="centered-image" style={{ paddingTop: '190px' }}> {/* Apply the centered-image class to the div */}
            <img src={Nodata} alt="Centered Image" />
        </div>
    );
}

export default EmptyPage;
