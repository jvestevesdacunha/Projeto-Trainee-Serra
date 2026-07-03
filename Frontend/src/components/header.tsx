   import {Link} from "react-router-dom";

    export function Header() {
      return (<header className="bg-gray-800 text-white text-center py-6 w-full">
        <h1 className="text-3xl font-bold m-0">
          Log de Exercícios
        </h1>
        <Link to="/registrar" className="bg-[#8A0303] text-white px-5 py-3 rounded-lg mt-4 inline-block">
          Novo Exercício
        </Link>
        <Link to="/" className="bg-[#8A0303] text-white px-5 py-3 rounded-lg mt-4 inline-block ml-4">
          Lista de Exercícios
        </Link>
      </header>);}