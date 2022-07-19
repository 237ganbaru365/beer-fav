# フォルダ構成

- redux-toolkit way

  - 迷子の home のページをどこにおくべきか、サンプルの調査

- ページベース

  - redux-toolkit の中は state 管理のロジックだけ
  - ページ下にコンポーネントを持ってくる

- どっちつかずは、稚拙な印象になっちゃうから、避けたい！

# typescript に変更するときの手順 create-react-app

- https://create-react-app.dev/docs/adding-typescript/
- `js`を`ts`に手動で書き換えても、`npm start`でちゃんと機動するように設定してくれる

# firebase のログイン管理

- react との二重管理になっている？
- firebase の状態と乖離している

## どこまで任せるべきもん？

- firebase のやり方に則った方が、綺麗だね、とされる

  - 小回りは効かない
  - どこまでを firebase に任せて、どこからをカスタムにするか、は設計、自分で決めまーす

## firebase の提供している機能

- firebase.isLogin() => true / false
- firebase.onChange => ファイアベース内の auth の状態が変わったら、発火される

  ```
  firebase.onChange((isLogin)=>{
    <!-- update react state -->
  })
  ```

- firebase のやり方のサンプルとかを調べるのがめんどうくさい
- サンプルソースが、わりと、高度な書き方してて、読み解くのだるい、google くそ
- トレードオフで、自前実装はわりとあり。サンプルも多いし
- どこまで react, どこまで firebase はグラデーションあるよ。
  でも、どうせ firebase 使うなら、なるべく任せた方が綺麗と判断する人が多いよう
