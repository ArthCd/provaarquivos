import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaLivro() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/livro`);
      setDados(data);
    } catch (error) {
      console.error("Erro ao listar livros:", error);
      alert("Erro ao carregar os livros.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Livros"
        descricao="Gerencie aqui os livros cadastrados no sistema"
        rota="/cadastrolivro"
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Título</th>
            <th scope="col">Edição</th>
            <th scope="col">Páginas</th>
            <th scope="col">Ano Publicação</th>
            <th scope="col">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={d.idlivro || i}>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/cadastrolivro/${d.idlivro}`}
                >
                  Alterar
                </a>
              </td>
              <td>{d.idlivro}</td>
              <td>{d.titulo}</td>
              <td>{d.edicao}</td>
              <td>{d.paginas}</td>
              <td>{d.publicacao}</td>
              <td>{d.ativo ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
