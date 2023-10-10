import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//import Users from "./user/pages/Users";
import NavLinks from "./shared/components/Navigation/NavLinks";
import Acasa from "./pages/Acasa";
//import Cursuri from "./cursuri/pages/Cursuri";
import BMICalculator from "./pages/BMICalculator";
//import NewPost from "./postari/pages/NewPost";
//import UpdatePost from "./postari/pages/UpdatePost";
//import UserPosts from "./postari/pages/UserPosts";
//import Autentificare from "./user/pages/Autentificare";
import Alimentatie from "./nutritie/pages/Alimentatie";
//import PaginaCursSingle from "./pages/PaginaCursSingle.js";
import { ToastContainer } from "react-toastify";

import { AutentificareContext } from "./shared/context/conect-context";
import { useAuth } from "./shared/hooks/auth-hook";
import InputSchelet from "./cursuri/schelet/components/InputSchelet";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const Cursuri = React.lazy(() => import("./cursuri/pages/Cursuri"));
const NewPost = React.lazy(() => import("./postari/pages/NewPost"));
const UpdatePost = React.lazy(() => import("./postari/pages/UpdatePost"));
const UserPosts = React.lazy(() => import("./postari/pages/UserPosts"));
const Autentificare = React.lazy(() => import("./user/pages/Autentificare"));
const PaginaCursSingle = React.lazy(() => import("./pages/PaginaCursSingle"));

const App = () => {
  const { token, autentificare, dezautentificare, userId, rol, name } =
    useAuth();
  let rute;

  if (token) {
    rute = (
      <React.Fragment>
        <Route path="/" element={<Acasa />} />
        <Route path="/curs/:id" element={<PaginaCursSingle />} />
        <Route path="/cursuri" element={<Cursuri />} />
        <Route path="/cursuri/creare" element={<InputSchelet />} />
        <Route path="/postari" element={<Users />} />
        <Route path="/:userId/postari" element={<UserPosts />} />
        <Route path="/postari/creare" element={<NewPost />} />
        <Route path="/postari/:postId" element={<UpdatePost />} />
        <Route path="/bmicalculator" element={<BMICalculator />} />
        <Route path="/alimentatie" element={<Alimentatie />} />

        {/* <Route path="*" element={<Navigate to="/" />}></Route> */}
      </React.Fragment>
    );
  } else {
    rute = (
      <React.Fragment>
        <Route path="/" element={<Acasa />} />
        <Route path="/cursuri" element={<Cursuri />} />
        <Route path="/postari" element={<Users />} />
        <Route path="/:userId/postari" element={<UserPosts />} />
        <Route path="/autentificare" element={<Autentificare />} />
        <Route path="/bmicalculator" element={<BMICalculator />} />
        <Route path="/alimentatie" element={<Alimentatie />} />

        {/* <Route path="*" element={<Navigate to="/autentificare" />}></Route> */}
      </React.Fragment>
    );
  }

  return (
    <AutentificareContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        rol: rol,
        name: name,
        autentificare: autentificare,
        dezautentificare: dezautentificare,
      }}
    >
      <Router>
        <NavLinks />
        <main>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>{rute}</Routes>
          </Suspense>
        </main>
      </Router>
      <ToastContainer />
    </AutentificareContext.Provider>
  );
};

export default App;
