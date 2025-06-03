import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaUsuario() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/usuario`);
      setDados(data);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      alert("Erro ao carregar os usuários.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Usuários"
        descricao="Gerencie aqui os usuários cadastrados no sistema"
        rota="/cadastrousuario"
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Nome</th>
            <th scope="col">Nascimento</th>
            <th scope="col">CPF</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={d.idusuario || i}>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/cadastrousuario/${d.idusuario}`}
                >
                  Alterar
                </a>
              </td>
              <td>{d.idusuario}</td>
              <td>{d.nome}</td>
              <td>{d.nascimento ? new Date(d.nascimento).toLocaleDateString() : ""}</td>
              <td>{d.cpf}</td>
              <td>{d.email}</td>
              <td>{d.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
