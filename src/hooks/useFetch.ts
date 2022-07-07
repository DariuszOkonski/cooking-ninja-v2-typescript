import { useEffect, useState } from "react";
import { IRecipe } from './../interfaces/index';


type DataType = IRecipe[] | null;
type IsPendingType = boolean;
type ErrorType = string | null;
type OptionsTypeFunc = (postData: IRecipe) => void;
type UseFetchReturnType = [DataType, IsPendingType, ErrorType, OptionsTypeFunc]
type OptionsType = IOptions | null;

interface IOptions {
    method: string;
    headers: {},
    body: string
}

const useFetch = (url: string, method: string = "GET"): UseFetchReturnType => {
    const [data, setData] = useState<DataType>(null)
    const [isPending, setIsPending] = useState<IsPendingType>(false)
    const [error, setError] = useState<ErrorType>(null)
    const [options, setOptions] = useState<OptionsType>(null);

    const postData = (postData: IRecipe) => {
        setOptions({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        }) 
    }

    useEffect(() => {
        const controller = new AbortController();
    
        const fetchData = async (fetchOptions: OptionsType = null) => {
            setIsPending(true);

            try {
                const res = await fetch(url, {
                    ...fetchOptions,
                    signal: controller.signal
                })

                if(!res.ok) {
                    throw new Error(`${res.status} - ${res.statusText}`)
                }

                const data = await res.json();
                
                if(!data.length) {
                    throw new Error('There is no such an element')
                }

                setIsPending(false);
                setData(data);
                setError(null);
            } catch (err) {
                if(err instanceof Error) {
                    if(err.name === 'AbortError') {
                        console.log('the fetch was aborted')
                    } else {
                        setIsPending(false)
                        setError(err.message);
                        setData(null);
                    }
                }
            }

        }
        
        if(method === 'GET') {
            fetchData();
        }
        if(method === 'POST' && options) {
            fetchData(options);
        }

    
        return () => {
            controller.abort();
        }
    }, [url, options, method])
    

    return [data, isPending, error, postData];
}
 
export default useFetch;