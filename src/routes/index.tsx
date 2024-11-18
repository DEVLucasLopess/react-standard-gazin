import { Routes, Route } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { DashBoard, ListagemDePessoas, CadastroEdicaoPessoas, CadastroEdicaoCidades, ListagemDeCidades } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'people',
        label: 'Programadores',
        path: '/pessoas',
        onClick: undefined,
      },
      {
        icon: 'location_city',
        label: 'Nivel de Conhecimento',
        path: '/cidades',
        onClick: undefined,
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<CadastroEdicaoPessoas />} />

      <Route path="/cidades" element={<ListagemDeCidades/>} />
      <Route path="/cidades/detalhe/:id" element={<CadastroEdicaoCidades />} />

      <Route path="*" element={<DashBoard />} />
    </Routes>
  );
};