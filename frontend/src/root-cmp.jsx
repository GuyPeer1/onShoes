import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'


export function RootCmp() {

    return (
        <section className="main-layout">
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
        </section>
    )
}


