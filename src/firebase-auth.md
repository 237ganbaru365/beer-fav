# firebase の auth のまとめ

- login

  - email, password
  - return `userId`, `token`
    - set to `application state`

- signUp

  - email, password, user info
  - return `userId`, `token`
    - set to `application state`

- auto-login

  - check token in state / firebase.isLogin - `useEffect`
    - true - dispatch(login(userId, token))

- auto-logout
  - firebase.onChange() - 的なやつがあるはず - observer pattern
    - firebase.isLogin
      - false - dispatch(logout(userId, token))
