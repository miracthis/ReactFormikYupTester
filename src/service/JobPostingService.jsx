import axios from 'axios'
import React from 'react'

export const addJobPosting  = (values) => {
    return axios.post("/jobPostings/add", values)
}
