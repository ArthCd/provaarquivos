import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaAutor() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/autor`);
      setDados(data);
    } catch (error) {
      console.error("Erro ao listar autores:", error);
      alert("Erro ao carregar autores.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Autores"
        descricao="Gerencie aqui os autores dos livros da biblioteca"
        rota="/cadastroautor"
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Foto</th>
            <th scope="col">Código</th>
            <th scope="col">Nome</th>
            <th scope="col">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d) => (
            <tr key={d.idautor}>
              <td>
                <a className="btn btn-primary" href={`/cadastroautor/${d.idautor}`}>
                  Alterar
                </a>
              </td>
              <td>
                {d.foto ? (
                  <img
                  src={d.foto}  // <-- usa URL externa direta aqui
                  alt={`Foto de ${d.nomeautor}`}
                  style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                />
                ) : (
                  <span>Sem foto</span>
                )}
              </td>
              <td>{d.idautor}</td>
              <td>{d.nomeautor}</td>
              <td>{d.nascimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
