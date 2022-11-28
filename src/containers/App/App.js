//commons css
import 'antd/dist/antd.min.css';
import './App.scss';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from '../../components/Header/Header';

import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import authActions from '../../reducers/auth';
import userActions from '../../reducers/user';

import '../../configs/message.config';
import { publicRoutes, privateRoutes } from '../../routes/routes'
import GlobalLoading from '../../components/Loading/Global';
import Footer from '~/components/Footer';
//import NotFound from '../../components/NotFound';
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authenticate.isAuth);

  useEffect(() => {
    //authentication
    dispatch(authActions.getIsAuth());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    //get user -> store redux
    if (isAuth) dispatch(userActions.getUserRequest());
    return () => {};
  }, [dispatch, isAuth]);
  return (
    <Router>
    <Suspense fallback={<GlobalLoading />}>
      <div className="App"> 
        <Routes>
          {publicRoutes.map((route, index) => {
                        const Page = route.main;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={
                                    <Fragment>
                                      <Header/>
                                      <Page />
                                      <Footer />
                                    </Fragment>
                                }
                            />
                        );
                    })}
          {
            privateRoutes.map((route, index) => {
                        const Page = route.main;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={
                                    <>
                                      <Page />
                                    </>
                                }
                            />
                        );
                    })
          }
          
        </Routes>
      </div>
      </Suspense>
    </Router>
  );
}

export default App;
