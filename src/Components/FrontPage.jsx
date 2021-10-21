import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CityItem from './CityItem'
import * as axios from 'axios'

function FrontPage (props){

    let getInfoByCityName = (name) => {
        let instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/`
        })
        instance.get(`weather?q=${name}&appid=e9822466c14f5a61fb03c57fe3601e20&units=imperial`)
        .then(res => props.setInfo(res.data))
    }
    
    useEffect(() => {
        getInfoByCityName('London')
        getInfoByCityName('Washington')
        getInfoByCityName('San Francisco')
        getInfoByCityName('Tokyo')
        getInfoByCityName('Kyiv')
    }, [])

    let list = props.info.map(el => <CityItem info={el}/>)
    return(
        <div>
            {props.info.length == 0 ? 'Loading' : list}
        </div>
    )
}

let mstp = (state) => ({
    info: state.main.info
})
let mdtp = (dispatch) => ({
    setInfo: (info) => {
        dispatch({type:'setInfo', info})
    }
})

export default connect(mstp, mdtp)(FrontPage)