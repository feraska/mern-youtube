import { useEffect, useState } from "react";
import { api } from "../utils/constant";
const useFetch = (url) => {
    const [data,setData] = useState([])
    
    useEffect(()=>{
        const fetchData = async() => {
            try{
            const res = await api.get(url,{
                withCredentials:true
            })
           
            setData(res.data)
            } catch (err) {
                console.log("error",err)
            }
        }
        fetchData()
    },[url])
    return {
        data
    }
    
}
export default useFetch