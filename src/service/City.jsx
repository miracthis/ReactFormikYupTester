
import axios from "axios"
import React from 'react'

export const getCities = () => {
        return axios.get("/cities/getall")
    }



