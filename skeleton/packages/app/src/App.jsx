import React, { Suspense, lazy } from 'react'
import history from './history'
import { Router, Switch, Route } from 'react-router-dom'

import Layout from './components/Containers/Layout/Layout'
import PageLoader from './components/UI/PageLoader/PageLoader'

const HomeLazy = lazy(() => import('./components/Pages/Home/Home'))
const LogsLazy = lazy(() => import('./components/Pages/Logs/Logs'))

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route exact path='/'>
              <HomeLazy />
            </Route>
            <Route exact path='/logs'>
              <LogsLazy />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
