import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const voltar = () => navigate("/listausuario");

  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
      setNome(data.nome || "");
      setNascimento(data.nascimento || "");
      setCpf(data.cpf || "");
      setEmail(data.email || "");
      setTelefone(data.telefone || "");
      setSenha("");
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao carregar dados do usuário.");
    }
  };

  const alterar = async () => {
    try {
      const body = {
        nome,
        nascimento: nascimento || null,
        cpf,
        email,
        telefone,
        senha: senha || undefined, // só envia senha se preenchida
      };
      await axios.put(`http://localhost:4000/usuario/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar usuário:", error);
      alert("Erro ao alterar usuário.");
    }
  };

  const inserir = async () => {
    try {
      const body = {
        nome,
        nascimento: nascimento || null,
        cpf,
        email,
        telefone,
        senha,
      };
      await axios.post(`http://localhost:4000/usuario`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      alert("Erro ao inserir usuário.");
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
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/usuario/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Usuário" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="usuarioId" className="form-label">
              ID do Usuário
            </label>
            <input
              type="text"
              className="form-control"
              id="usuarioId"
              value={id}
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
