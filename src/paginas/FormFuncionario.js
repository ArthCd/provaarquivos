import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormFuncionario() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nomefuncionario, setNomefuncionario] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [salario, setSalario] = useState("");
  const [contratacao, setContratacao] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [senha, setSenha] = useState("");

  const voltar = () => navigate("/listafuncionario");

  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/funcionario/${id}`);
      setNomefuncionario(data.nomefuncionario || "");
      setNascimento(data.nascimento || "");
      setCpf(data.cpf || "");
      setEmail(data.email || "");
      setTelefone(data.telefone || "");
      setSalario(data.salario?.toString() || "");
      setContratacao(data.contratacao || "");
      setAtivo(data.ativo || false);
      setSenha("");
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      alert("Erro ao carregar dados do funcionário.");
    }
  };

  const alterar = async () => {
    try {
      const body = {
        nomefuncionario,
        nascimento: nascimento || null,
        cpf,
        email,
        telefone,
        salario: salario ? Number(salario) : null,
        contratacao: contratacao || null,
        ativo,
        senha: senha || undefined, // só envia senha se preenchida
      };
      await axios.put(`http://localhost:4000/funcionario/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar funcionário:", error);
      alert("Erro ao alterar funcionário.");
    }
  };

  const inserir = async () => {
    try {
      const body = {
        nomefuncionario,
        nascimento: nascimento || null,
        cpf,
        email,
        telefone,
        salario: salario ? Number(salario) : null,
        contratacao: contratacao || null,
        ativo,
        senha,
      };
      await axios.post(`http://localhost:4000/funcionario`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir funcionário:", error);
      alert("Erro ao inserir funcionário.");
    }
  };

  const salvar = async () => {
    if (id) {
      await alterar();
    } else {
      await inserir();
    }
  };

  const excluir = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este funcionário?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/funcionario/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert("Erro ao excluir funcionário.");
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Funcionário" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="funcionarioId" className="form-label">
              ID do Funcionário
            </label>
            <input
              type="text"
              className="form-control"
              id="funcionarioId"
              value={id}
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nomefuncionario" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nomefuncionario"
            value={nomefuncionario}
            onChange={(e) => setNomefuncionario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nascimento" className="form-label">
            Data de Nascimento
          </label>
          <input
            type="date"
            className="form-control"
            id="nascimento"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
          <input
            type="tel"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="salario" className="form-label">
            Salário
          </label>
          <input
            type="number"
            className="form-control"
            id="salario"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contratacao" className="form-label">
            Data de Contratação
          </label>
          <input
            type="date"
            className="form-control"
            id="contratacao"
            value={contratacao}
            onChange={(e) => setContratacao(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="ativo"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="ativo">
            Ativo
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">
            Senha {id ? "(Preencha somente para alterar)" : ""}
          </label>
          <input
            type="password"
            className="form-control"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required={!id}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Salvar
          </button>
          <button type="button" className="btn btn-secondary" onClick={voltar}>
            Cancelar
          </button>
          {id && (
            <button type="button" className="btn btn-danger" onClick={excluir}>
              Deletar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
