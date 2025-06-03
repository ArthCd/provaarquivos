import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaEditora() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/editora`);
      setDados(data);
    } catch (error) {
      console.error("Erro ao listar editoras:", error);
      alert("Erro ao carregar as editoras.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Editoras"
        descricao="Gerencie aqui as editoras cadastradas no sistema"
        rota="/cadastroeditora"
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Nome</th>
            <th scope="col">CNPJ</th>
            <th scope="col">Endereço</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={d.ideditora || i}>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/cadastroeditora/${d.ideditora}`}
                >
                  Alterar
                </a>
              </td>
              <td>{d.ideditora}</td>
              <td>{d.nomeeditora}</td>
              <td>{d.cnpj}</td>
              <td>{d.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
