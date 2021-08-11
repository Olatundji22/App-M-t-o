import React from 'react';
import './formulaire.style.css';

const Formulaire = props => {

    return (

        <div className="container">
            <div>{ props.error ? error():null }</div>
            <form onSubmit={props.loadweather}>
                <div className="row">
                    <div className="col-md-3 offset-md-4">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="Entrer une ville"/>
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-warning">Vois la Météo</button>
                    </div>
                </div>
            </form><br/>
        </div>

    )
}

function error(){
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Veuillez entrer une Ville
        </div>
    );
}

export default Formulaire;