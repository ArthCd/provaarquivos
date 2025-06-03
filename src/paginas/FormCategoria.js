import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomeCategoria, setNomeCategoria] = useState('');

  // Voltar para a lista
  const voltar = () => {
    navigate("/listacategoria");
  };

  // Buscar categoria existente (modo edição)
  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/categoria/${id}`);
      setNomeCategoria(data.nomecategoria);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      alert("Erro ao carregar dados da categoria.");
    }
  };

  // Alterar categoria existente
  const alterar = async () => {
    try {
      const body = { nomecategoria: nomeCategoria };
      await axios.put(`http://localhost:4000/categoria/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar categoria:", error);
      alert("Erro ao alterar categoria.");
    }
  };

  // Inserir nova categoria
  const inserir = async () => {
    try {
      const body = { nomecategoria: nomeCategoria };
      await axios.post(`http://localhost:4000/categoria/`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir categoria:", error);
      alert("Erro ao inserir categoria.");
    }
  };

  // Salvar (decide entre inserir ou alterar)
  const salvar = async () => {
    if (id) {
      await alterar();
    } else {
      await inserir();
    }
  };

  // Excluir categoria
  const excluir = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/categoria/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Erro ao excluir categoria.");
    }
  };

  // useEffect para carregar dados se estiver editando
  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Categoria" />
      <form
        onSubmit={(e) => {
          e.preventDefault(); // evita recarregamento da página
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="categoriaId" className="form-label">
              ID da Categoria
            </label>
            <input
              type="text"
              className="form-control"
              id="categoriaId"
              value={id}
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nomeCategoria" className="form-label">
            Nome da Categoria
          </label>
          <input
            type="text"
            className="form-control"
            id="nomeCategoria"
            placeholder="Digite o nome da categoria"
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            required
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
