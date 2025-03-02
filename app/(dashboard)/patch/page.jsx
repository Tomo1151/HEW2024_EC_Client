import "./patch.css";

import { headers } from "next/headers";
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
        <h2>バージョン 0.3.2.0</h2>
        <h3>バグ修正</h3>
        <ul>
          <li>
            <p>
              商品投稿フォームの値段フィールドがスクロールで予期しない値へ変更されてしまう問題を修正
            </p>
          </li>
          <li>
            <p>
              商品投稿フォームの値段フィールド・商品説明フィールドのバリデーションマークがUIと重なってしまう問題を修正
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>バージョン 0.2.28.0</h2>
        <h3>バグ修正</h3>
        <ul>
          <li>
            <p>商品投稿フォームの必須フィールドに表記を追加</p>
          </li>
          <li>
            <p>
              ヘッダーの「通知」「カート」のみクリック判定が小さかった問題を修正
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>バージョン 0.2.27.0</h2>
        <h3>バグ修正</h3>
        <ul>
          <li>
            <p>未ログイン時に利用規約等のページが見られなかった問題を修正</p>
          </li>
          <li>
            <p>お問い合わせページ等のレイアウトを修正</p>
          </li>
          <li>
            <p>
              ユーザーのプロフィールページのOGPが正しく表示されない問題を修正
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>バージョン 0.2.21.1</h2>
        <h3>バグ修正</h3>
        <ul>
          <li>
            <p>
              商品投稿時に意図しないバリデーションが発生してしまう問題を修正
            </p>
            <p>
              商品説明文は最低10文字以上、最大2048文字までとなります。商品名は最低3文字以上、最大64文字までとなります。
            </p>
          </li>
        </ul>
      </section>

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
          <li>
            <p>
              スマートフォンで利用規約やお問い合わせフォームへのリンクが表示されない問題を修正
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
    openGraph: {
      title: "パッチノート | Miseba",
      description: "Misebaの最新の機能やバグ修正に関する情報を提供します。",
      images: [
        {
          url: process.env.NEXT_PUBLIC_SITE_ORIGIN
            ? process.env.NEXT_PUBLIC_SITE_ORIGIN + "/miseba_ogp.png"
            : `https://${headers().get("host")}/miseba_ogp.png`,
          width: 3000,
          height: 1575,
        },
      ],
    },
  };
}

export default PatchPage;
