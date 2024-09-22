import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import cn from 'classnames'
import Panel from "views/Panel/Panel";
import Index from "views/Index/Index";
import Modal from "components/common/Modal/Modal";
import style from './App.module.sass'
import HeaderContainer from "components/common/Header/HeaderContainer";
import Microalerts from "components/common/Microalerts/Microalerts";
import Register from "components/auth/Register/Register";
import Login from "components/auth/Login/Login";
import { appInitialization } from "store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "components/common/ProtectedRoute/ProtectedRoute";
import LoggedInRedirect from "components/common/LoggedInRedirect/LoggedInRedirect";
import Preloader from "components/common/Preloader/Preloader";


const App = () => {

  const appData = useSelector(store => store.app.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appInitialization())
  }, [])

  if(appData.isInit) {
    return (
      <div className={style.app}>
        <header>
          <div className={style.wrap}>
            <div className={style.container}>
              <HeaderContainer />
            </div>
          </div>
        </header>
        <main className={style.main}>
          <div className={cn(style.wrap, style.wrap_horizontalScroll)}>
            <div className={cn(style.container, style.container_horizontalScroll)}>
              <Routes>
                <Route path={'/'} element={<Index />}/>
                <Route element={<ProtectedRoute />}>
                  <Route path={'/panel'} element={<Panel />}/>
                </Route>
                <Route path={'auth/'}>
                  <Route element={<LoggedInRedirect />}>
                    <Route path={'signin'} element={<Login />}/>
                    <Route path={'signup'} element={<Register />}/>
                    {/* Изменить пароль */}
                  </Route>
                </Route>
              </Routes>
            </div>
          </div>
        </main>
        <Microalerts />
        {/* <Modal /> */}
      </div>
    )
  } else {
    return(
      <main>
        <div className={style.wrap}>
          <div className={style.container}>
            <Preloader/>
          </div>
        </div>
      </main>
    )
  }

  
}

export default App;
