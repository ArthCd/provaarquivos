export default function TituloLista(props){
    return(
        <><>
  {/* Card */}
  <div className="container mt-4">
    <div className="card bg-light mb-4">
      <div className="card-body">
        <h5 className="card-title">{props.titulo}</h5>
        <p className="card-text">{props.descricao}</p>
        <a href={props.rota} className="btn btn-primary btn-nf">
          Novo
        </a>
      </div>
    </div>
  </div>
</>
</>
    );
};