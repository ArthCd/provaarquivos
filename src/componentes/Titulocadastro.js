

export default function Titulocadastro(props){
 const prefixo = (props.id) ? `Alterando` : ` Inserindo`;


    return(
        <>
        
        <h1>{prefixo} {props.titulo}</h1>
       


        </>
    );
}