import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Titulocadastro from "../componentes/Titulocadastro";

export default function FormAutor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nomeAutor, setNomeAutor] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [biografia, setBiografia] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [foto, setFoto] = useState('');

  const voltar = () => {
    navigate("/listaautor");
  };

  const selecionar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/autor/${id}`);
      setNomeAutor(data.nomeautor);
      setNascimento(data.nascimento);
      setBiografia(data.biografia);
      setNacionalidade(data.nacionalidade);
      setFoto(data.foto);
    } catch (error) {
      console.error("Erro ao buscar autor:", error);
      alert("Erro ao carregar dados do autor.");
    }
  };

  const alterar = async () => {
    try {
      const body = {
        nomeautor: nomeAutor,
        nascimento,
        biografia,
        nacionalidade,
        foto
      };
      await axios.put(`http://localhost:4000/autor/${id}`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao alterar autor:", error);
      alert("Erro ao alterar autor.");
    }
  };

  const inserir = async () => {
    try {
      const body = {
        nomeautor: nomeAutor,
        nascimento,
        biografia,
        nacionalidade,
        foto
      };
      await axios.post(`http://localhost:4000/autor/`, body);
      voltar();
    } catch (error) {
      console.error("Erro ao inserir autor:", error);
      alert("Erro ao inserir autor.");
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
    const confirmar = window.confirm("Tem certeza que deseja excluir este autor?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:4000/autor/${id}`);
      voltar();
    } catch (error) {
      console.error("Erro ao excluir autor:", error);
      alert("Erro ao excluir autor.");
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <Titulocadastro id={id} titulo="Autor" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
      >
        {id && (
          <div className="mb-3">
            <label htmlFor="autorId" className="form-label">ID do Autor</label>
            <input type="text" className="form-control" id="autorId" value={id} disabled />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nomeAutor" className="form-label">Nome do Autor</label>
          <input type="text" className="form-control" id="nomeAutor" value={nomeAutor} onChange={(e) => setNomeAutor(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="nascimento" className="form-label">Data de Nascimento</label>
          <input type="date" className="form-control" id="nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
          <input type="text" className="form-control" id="nacionalidade" value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="biografia" className="form-label">Biografia</label>
          <textarea className="form-control" id="biografia" rows="4" value={biografia} onChange={(e) => setBiografia(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="foto" className="form-label">URL da Foto</label>
          <input type="text" className="form-control" id="foto" value={foto} onChange={(e) => setFoto(e.target.value)} />
          {foto && (
            <div className="mt-2">
              <img src={foto} alt="Foto do autor" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={voltar}>Cancelar</button>
          {id && (
            <button type="button" className="btn btn-danger" onClick={excluir}>Deletar</button>
          )}
        </div>
      </form>
    </div>
  );
}
