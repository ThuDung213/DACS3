import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const axios = require('axios');

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'ca04871639msha5e83cace868027p1c4a51jsn14182dee1853',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },

    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
            alert('There is an error')
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const delay = 1000;
        const timer = setTimeout(() => {
            fetchData();
        }, delay);

        return () => clearTimeout(timer);

    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;