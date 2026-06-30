import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Account/LoginPage";
import RegisterPage from "../pages/Account/RegisterPage";
import Home from "../pages/Home/Index";
import PrivateLayout from "../components/layout/PrivateLayout";

import CursosIndex from "../pages/Cursos/Index";
import CursosCreate from "../pages/Cursos/Create";
import CursosEdit from "../pages/Cursos/Edit";
import CursosDetails from "../pages/Cursos/Details";
import CursosDelete from "../pages/Cursos/Delete";

import ProfesoresIndex from "../pages/Profesores/Index";
import ProfesoresCreate from "../pages/Profesores/Create";
import ProfesoresEdit from "../pages/Profesores/Edit";
import ProfesoresDetails from "../pages/Profesores/Details";
//import ProfesoresDelete from "../pages/Profesores/Delete";

import CategoriasIndex from "../pages/Categorias/Index";
import CategoriasCreate from "../pages/Categorias/Create";
import CategoriasEdit from "../pages/Categorias/Edit";
import CategoriasDetails from "../pages/Categorias/Details";
import CategoriasDelete from "../pages/Categorias/Delete";

import EstudiantesIndex from "../pages/Estudiantes/Index";
import EstudiantesCreate from "../pages/Estudiantes/Create";
import EstudiantesEdit from "../pages/Estudiantes/Edit";
import EstudiantesDetails from "../pages/Estudiantes/Details";
import EstudiantesDelete from "../pages/Estudiantes/Delete";

import MatriculasIndex from "../pages/Matriculas/Index";

function rutasCrud(base, { Index, Create, Edit, Details, Delete }) {
  return (
    <>
      <Route path={base} element={<Index />} />
      <Route path={`${base}/crear`} element={<Create />} />
      <Route path={`${base}/:id`} element={<Details />} />
      <Route path={`${base}/:id/editar`} element={<Edit />} />
      <Route path={`${base}/:id/eliminar`} element={<Delete />} />
    </>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<Home />} />

      <Route element={<PrivateLayout />}>
      {rutasCrud("/cursos", {
        Index: CursosIndex,
        Create: CursosCreate,
        Edit: CursosEdit,
        Details: CursosDetails,
        Delete: CursosDelete,
      })}

      {rutasCrud("/profesores", {
        Index: ProfesoresIndex,
        Create: ProfesoresCreate,
        Edit: ProfesoresEdit,
        Details: ProfesoresDetails,
       // Delete: ProfesoresDelete,
      })}

      {rutasCrud("/categorias", {
        Index: CategoriasIndex,
        Create: CategoriasCreate,
        Edit: CategoriasEdit,
        Details: CategoriasDetails,
        Delete: CategoriasDelete,
      })}

      {rutasCrud("/matriculas", {
          Index: MatriculasIndex
      })}

      {rutasCrud("/estudiantes",{
          Index: EstudiantesIndex
      })}
      </Route>
    </Routes>
  );
}