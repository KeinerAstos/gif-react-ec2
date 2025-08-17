import "@fortawesome/fontawesome-free/css/all.min.css";
export const GifItem = ({ title,url}) => {
  return (
    <div className="card">
      <img id='imagen-card' src={url} alt="title" />
      <p>{title} </p>
       <a
      href={url}
      target="_blank"
      
      download
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800 w-fit no-underline"
      id="boton-descarga"
    >
      <i className="fas fa-download"></i>
      Descargar
    </a>
    </div>

  )
}
