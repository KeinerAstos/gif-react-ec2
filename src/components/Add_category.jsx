import { useState } from "react"
    

export const Add_category = ({onAdCategory}) => {

    const [valor,setValor] = useState(['']);

    const onTChange = ({target}) =>{
        setValor(target.value);
    }
    const onZubmit = () =>{
        event.preventDefault();
        if(valor.trim().length < 1){
          return   
        }
        //console.log(valor);
        onAdCategory(valor.trim());
        
        //setCategoria(categori => [valor,...categori]);
        setValor('');
    }
    return (
        <form onSubmit={onZubmit} id="formulario-input">
            <input 
        type="text" 
        name="" 
        id="inputsito"
        placeholder="Buscar algo" 
        value={valor}
        onChange={onTChange}/>
        </form>
        
        
    )
}