import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginPage, SignupPage } from './Auth';
import { useAuth } from './Hooks';
import { GeneralChatPage, ProfilePage } from './Pages';
import { unAuthorizedError, notFoundError } from './Utils';

export function AppRouting() {
  const { isAuth } = useAuth();

  return (
    <Switch>
      <Route path = "/auth/login"  render = { props => isAuth ? unAuthorizedError() : <LoginPage  { ...props } /> } />
      <Route path = "/auth/signup" render = { props => isAuth ? unAuthorizedError() : <SignupPage { ...props } /> } />
      <Route path = "/general"           component = { GeneralChatPage } />
      <Route path = "/profile/:username" component = { ProfilePage } />
      {/* Redirects Cases */}
      <Redirect path = "/"     to = "/general" exact />
      <Redirect path = "/home" to = "/" />
      {/* 404 Case */}
      <Route path = "*" render = { () => notFoundError() } />
    </Switch>
  )
}
