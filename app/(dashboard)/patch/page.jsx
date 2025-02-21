import "./patch.css";

import Link from "next/link";
import { Container } from "@mui/material";

const PatchPage = () => {
  return (
    <Container
      component="main"
      sx={{
        // fontFamily: "monospace",
        backgroundColor: "white",
        maxWidth: "800px",
        my: { xs: 0, sm: "2em" },
        p: { xs: "1em", sm: "1em 2.5em" },
        mx: "auto",
        borderRadius: "0.375em",
        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      }}
      className="patch"
    >
      <h1>パッチノート</h1>
      <p>
        このパッチノートは、Misebaの最新の機能やバグ修正に関する情報を提供します。
      </p>

      <section>
        <h2>バージョン 0.2.21.0</h2>
        <h3>新機能</h3>
        <ul>
          <li>
            <p>『商品投稿』タブの追加</p>
            <p>
              <Link href="/" className="underline">
                タイムライン
              </Link>
              で商品のみを表示できるようになりました（商品投稿タブ）。
            </p>
          </li>
        </ul>
        <h3>バグ修正</h3>
        <ul>
          <li>
            <p>
              タブによる投稿フィルタで条件に当てはまらないリポストが表示されていた問題を修正
            </p>
          </li>
          <li>
            <p>
              『フォロー中』タブのとなりに空白のタブが選択生成されていた問題を修正
            </p>
          </li>
          <li>
            <p>
              <Link href="/dashboard" className="underline">
                ダッシュボード
              </Link>
              のテキストを一部修正
            </p>
          </li>
          <li>
            <p>
              ダッシュボード等ログインが必要なページにログアウト状態でアクセスした際のリダイレクト処理を改善
            </p>
          </li>
          <li>
            <p>
              商品と通常の投稿でメニューボタンのサイズが異なっていた問題を修正
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>バージョン 0.2.18.0</h2>
        <h3>新機能</h3>
        <ul>
          <li>投稿商品のデータ修正機能</li>
        </ul>
        <h3>バグ修正</h3>
        <ul>
          <li>
            2度目以降のユーザープロフィール編集時にアイコンがリセットされてしまう問題を修正
          </li>
          <li>性能の最適化に関するいくつかの改善を行いました</li>
        </ul>
      </section>
    </Container>
  );
};

export async function generateMetadata({}) {
  return {
    title: "パッチノート | Miseba",
    description: "Misebaの最新の機能やバグ修正に関する情報を提供します。",
  };
}

export default PatchPage;
