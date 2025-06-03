import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormLivro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [edicao, setEdicao] = useState('');
  const [paginas, setPaginas] = useState('');
  const [publicacao, setPublicacao] = useState('');
  const [foto, setFoto] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [resumo, setResumo] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [condicaofisica, setCondicaofisica] = useState('');
  const [emprestado, setEmprestado] = useState(false);
  const [ideditora, setIdeditora] = useState('');
  const [idcategoria, setIdcategoria] = useState('');

  const voltar = () => navigate("/listalivro");

  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
      setTitulo(data.titulo);
      setEdicao(data.edicao || '');
      setPaginas(data.paginas || '');
      setPublicacao(data.publicacao || '');
      setFoto(data.foto || '');
      setLocalizacao(data.localizacao || '');
      setResumo(data.resumo || '');
      setAtivo(data.ativo || false);
      setCondicaofisica(data.condicaofisica || '');
      setEmprestado(data.emprestado || false);
      setIdeditora(data.ideditora);
      setIdcategoria(data.idcategoria);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      alert("Erro ao carregar dados do livro.");
    }
  };

  const alterar = async () => {
    try {
      const body = {
        titulo,
        edicao,
        paginas: paginas ? Number(paginas) : null,
        publicacao: publicacao ? Number(publicacao) : null,
        foto,
        localizacao,
        resumo,
        ativo,
        condicaofisica,
        emprestado,
        ideditora: Number(ideditora),
        idcategoria: Number(idcategoria),
      };
      await axios.put(`http://localhost:4000/livro/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar livro:", error);
      alert("Erro ao alterar livro.");
    }
  };

  const inserir = async () => {
    try {
      const body = {
        titulo,
        edicao,
        paginas: paginas ? Number(paginas) : null,
        publicacao: publicacao ? Number(publicacao) : null,
        foto,
        localizacao,
        resumo,
        ativo,
        condicaofisica,
        emprestado,
        ideditora: Number(ideditora),
        idcategoria: Number(idcategoria),
      };
      await axios.post(`http://localhost:4000/livro/`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir livro:", error);
      alert("Erro ao inserir livro.");
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
    const confirmar = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/livro/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      alert("Erro ao excluir livro.");
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Livro" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="livroId" className="form-label">
              ID do Livro
            </label>
            <input
              type="text"
              className="form-control"
              id="livroId"
              value={id}
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edicao" className="form-label">
            Edição
          </label>
          <input
            type="text"
            className="form-control"
            id="edicao"
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paginas" className="form-label">
            Páginas
          </label>
          <input
            type="number"
            className="form-control"
            id="paginas"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="publicacao" className="form-label">
            Ano de Publicação
          </label>
          <input
            type="number"
            className="form-control"
            id="publicacao"
            value={publicacao}
            onChange={(e) => setPublicacao(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="foto" className="form-label">
            URL da Foto
          </label>
          <input
            type="text"
            className="form-control"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="localizacao" className="form-label">
            Localização
          </label>
          <input
            type="text"
            className="form-control"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">
            Resumo
          </label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
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
          <label htmlFor="condicaofisica" className="form-label">
            Condição Física
          </label>
          <input
            type="text"
            className="form-control"
            id="condicaofisica"
            value={condicaofisica}
            onChange={(e) => setCondicaofisica(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="emprestado"
            checked={emprestado}
            onChange={(e) => setEmprestado(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="emprestado">
            Emprestado
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="ideditora" className="form-label">
            ID da Editora
          </label>
          <input
            type="number"
            className="form-control"
            id="ideditora"
            value={ideditora}
            onChange={(e) => setIdeditora(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="idcategoria" className="form-label">
            ID da Categoria
          </label>
          <input
            type="number"
            className="form-control"
            id="idcategoria"
            value={idcategoria}
            onChange={(e) => setIdcategoria(e.target.value)}
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
