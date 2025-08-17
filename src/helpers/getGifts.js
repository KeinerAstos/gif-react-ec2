export const getFift = async(categori) =>{
    const url = `https://api.giphy.com/v1/gifs/search?api_key=Ui6pPpxFYPaAWg7vhI8iz1XsEnagcjDl&q=${categori}&limit=10 `
    const resp = await fetch(url); 
    const { data } = await resp.json();


    const gifts = data.map(img =>({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url,
    }))
    
    return gifts;
}