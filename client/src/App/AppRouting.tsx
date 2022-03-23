import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthPage } from './Auth';
import { GeneralChatPage, ProfilePage } from './Pages';
import { notFoundError } from './Utils';

export function AppRouting() {

  return (
    <Switch>
      <Route path = "/general"           component = { GeneralChatPage } />
      <Route path = "/profile/:username" component = { ProfilePage } />
      <Route path = "/auth" component = { AuthPage } />
      {/* Redirects Cases */}
      <Redirect path = "/"     to = "/general" exact />
      <Redirect path = "/home" to = "/" />
      {/* 404 Case */}
      <Route path = "*" render = { () => notFoundError() } />
    </Switch>
  )
}
