import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init ( ) ;

const Meteo = (props) => {
    return(
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`}/>
                </h5>
                
                {props.celsius ? (<h1 className="py-2">{props.celsius}&deg;</h1>):null}

                {minmaxTemp(props.tempmin,props.tempmax)}

                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min,max){
    if(min && max){
        return(
            <h3 className="p-2">
                <span className="py-4">Min :{min}&deg;</span>/ 
                <span className="py-4">Max :{max}&deg;</span>
            </h3>
        );
    }
    
}


export default Meteo;