import { useState } from "react";
import { useEffect } from "react";
import { getFift } from "../helpers/getGifts";

export const useFetchGifs = (categori) => {
    const [images,setImages] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const getImages =async() =>{
        const newImages = await getFift(categori);
         setImages(newImages);
         setIsLoading(false);
     }
    useEffect (()=>{
     getImages();
    },[]) 

    
    return{
        images: images,
        isLoading: isLoading, 
    }
}
