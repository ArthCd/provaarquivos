export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                Listagens
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/listacategoria">
                    Categorias
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/listaautor">
                    Autores
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/listaeditora">
                    Editoras
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/listalivro">
                    Livros
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
