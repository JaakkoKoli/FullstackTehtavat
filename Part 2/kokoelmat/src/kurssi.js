import React from 'react';

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(x=><Osa osa={x.nimi} tehtavia={x.tehtavia} key={x.id} />)}
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.tehtavia} tehtävää</p>
        </div>
    )
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa tehtavia={kurssi.osat.map(a=>a.tehtavia).reduce((a,b)=>a+b, 0)} />
        </div>
    )
}

export default Kurssi