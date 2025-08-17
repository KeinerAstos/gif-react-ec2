import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';

export const GifGrid = ({categori}) => {

    const {images, isLoading } = useFetchGifs(categori); 
    console.log({images, isLoading });  


    return (
        <>
         
                <h3>{categori} </h3>
                {
                    isLoading && (<h2>Cargando...</h2>
                    )
                }
                <div className='card-grid'>
                    {
                        images.map((image) =>(
                            
                            <GifItem key={image.id} {...image} />
                        ))
                    }
                </div>   
            
    
        </>
  )
}
