import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaFuncionario() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/funcionario`);
      setDados(data);
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      alert("Erro ao carregar os funcionários.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Funcionários"
        descricao="Gerencie aqui os funcionários cadastrados no sistema"
        rota="/cadastrofuncionario"
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
            <th scope="col">Salário</th>
            <th scope="col">Contratação</th>
            <th scope="col">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={d.idfuncionario || i}>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/cadastrofuncionario/${d.idfuncionario}`}
                >
                  Alterar
                </a>
              </td>
              <td>{d.idfuncionario}</td>
              <td>{d.nomefuncionario}</td>
              <td>{d.nascimento ? new Date(d.nascimento).toLocaleDateString() : ""}</td>
              <td>{d.cpf}</td>
              <td>{d.email}</td>
              <td>{d.telefone}</td>
              <td>{d.salario}</td>
              <td>{d.contratacao ? new Date(d.contratacao).toLocaleDateString() : ""}</td>
              <td>{d.ativo ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
