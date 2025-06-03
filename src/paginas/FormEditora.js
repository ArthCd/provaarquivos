import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormEditora() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nomeeditora, setNomeeditora] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  const voltar = () => navigate("/listaeditora");

  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/editora/${id}`);
      setNomeeditora(data.nomeeditora);
      setCnpj(data.cnpj);
      setEndereco(data.endereco || '');
    } catch (error) {
      console.error("Erro ao buscar editora:", error);
      alert("Erro ao carregar dados da editora.");
    }
  };

  const alterar = async () => {
    try {
      const body = { nomeeditora, cnpj, endereco };
      await axios.put(`http://localhost:4000/editora/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar editora:", error);
      alert("Erro ao alterar editora.");
    }
  };

  const inserir = async () => {
    try {
      const body = { nomeeditora, cnpj, endereco };
      await axios.post(`http://localhost:4000/editora/`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir editora:", error);
      alert("Erro ao inserir editora.");
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
    const confirmar = window.confirm("Tem certeza que deseja excluir esta editora?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/editora/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir editora:", error);
      alert("Erro ao excluir editora.");
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Editora" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="editoraId" className="form-label">
              ID da Editora
            </label>
            <input
              type="text"
              className="form-control"
              id="editoraId"
              value={id}
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nomeeditora" className="form-label">
            Nome da Editora
          </label>
          <input
            type="text"
            className="form-control"
            id="nomeeditora"
            value={nomeeditora}
            onChange={(e) => setNomeeditora(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">
            CNPJ
          </label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endereco" className="form-label">
            Endereço
          </label>
          <textarea
            className="form-control"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
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
