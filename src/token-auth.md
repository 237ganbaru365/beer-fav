# token の auth のまとめ(参考)

- auth 設計
  - token ベースの auth
    - 昔、session ベースが主流
      - 横のスケールが難しい、サーバーが複数台でリクエストを処理、
      - 横のスケール - サーバ１(session)、サーバ２(session)、サーバ３(session)、台数を増やす
      - 縦のスケール - サーバ１のレベル１、サーバ１のレベル２、１台を強化していく
    - token ベース
      　- サーバ 1(validate token) - login してる！
      　- サーバ 2(validate token) - login してる！
      　- サーバ 3(validate token) - login してる！
  - フロントエンドでもたぶんよく使う
  - どう動いてるかわかってると、安心して作業できる

## token base backend

- login

  - email, password
  - return `userId`, `token`
    - set to `application state`

- signUp

  - email, password, user info
  - return `userId`, `token`
    - set to `application state`

- auto-login

  - check token in state - `useEffect`
    - true - dispatch(login(userId, token))

- auto-logout
  - check token - expiration in token
    - logout
