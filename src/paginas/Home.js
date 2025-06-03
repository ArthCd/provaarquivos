export default function Home(){
    return (
        <>
<>
  {/* Botões */}
  <div className="text-center my-3">
    <button className="btn btn-primary btn-lg btn-custom">Large button</button>
    <button className="btn btn-primary btn-lg btn-custom">Large button</button>
    <button className="btn btn-primary btn-lg btn-custom">Large button</button>
    <button className="btn btn-primary btn-lg btn-custom">Large button</button>
  </div>
  {/* Grid de Cards */}
  <div className="container">
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {/* Card 1 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 1"
          />
          <div className="card-body">
            <h5 className="card-title">O Guia do Estudante</h5>
            <p className="card-text">
              Editora Alfa
              <br />
              350 páginas
              <br />
              2022
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 2"
          />
          <div className="card-body">
            <h5 className="card-title">Matemática Essencial</h5>
            <p className="card-text">
              Editora Beta
              <br />
              420 páginas
              <br />
              2020
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 3"
          />
          <div className="card-body">
            <h5 className="card-title">História Geral</h5>
            <p className="card-text">
              Editora Clio
              <br />
              300 páginas
              <br />
              2019
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 4 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 4"
          />
          <div className="card-body">
            <h5 className="card-title">Física Moderna</h5>
            <p className="card-text">
              Editora Quantum
              <br />
              280 páginas
              <br />
              2021
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 5 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 5"
          />
          <div className="card-body">
            <h5 className="card-title">Biologia Celular</h5>
            <p className="card-text">
              Editora Vida
              <br />
              310 páginas
              <br />
              2023
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 6 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 6"
          />
          <div className="card-body">
            <h5 className="card-title">Química em Foco</h5>
            <p className="card-text">
              Editora Elemento
              <br />
              390 páginas
              <br />
              2020
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 7 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 7"
          />
          <div className="card-body">
            <h5 className="card-title">Literatura Brasileira</h5>
            <p className="card-text">
              Editora Letras
              <br />
              250 páginas
              <br />
              2018
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 8 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 8"
          />
          <div className="card-body">
            <h5 className="card-title">Geografia do Brasil</h5>
            <p className="card-text">
              Editora Terra
              <br />
              330 páginas
              <br />
              2021
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
      {/* Card 9 */}
      <div className="col">
        <div className="card h-100">
          <img
            src="https://via.placeholder.com/300x150"
            className="card-img-top"
            alt="Livro 9"
          />
          <div className="card-body">
            <h5 className="card-title">Redação Nota 1000</h5>
            <p className="card-text">
              Editora Expressão
              <br />
              210 páginas
              <br />
              2022
            </p>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
        </>
    );
};