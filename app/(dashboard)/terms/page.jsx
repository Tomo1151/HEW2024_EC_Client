import "./terms.css";

import { Container } from "@mui/material";

const TermsPage = () => {
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
      className="terms"
    >
      <h1>利用規約</h1>
      <p>
        この利用規約（以下、「本規約」）は、Miseba（以下、「本サービス」）の利用に関する条件を定めるものです。本サービスを利用するすべてのユーザー（以下、「ユーザー」）は、本規約に同意したものとみなします。
      </p>
      <section>
        <h2>第1条（適用）</h2>
        <ol>
          <li>
            本規約は、ユーザーと本サービスの運営者（以下、「運営者」）との間の本サービスの利用に関わる一切の関係に適用されます。
          </li>
          <li>
            運営者は、本規約のほか、本サービスの利用に関するルール（以下、「個別規定」）を定めることがあります。個別規定は、本規約の一部を構成するものとします。
          </li>
        </ol>
      </section>
      <section>
        <h2>第2条（サービスの内容）</h2>
        <ol>
          <li>
            本サービスは、ユーザーがデジタルデータ（zipファイルまたは画像ファイル）を販売・購入できるEC機能を備えたSNSプラットフォームです。
          </li>
          <li>
            ユーザーは、通常の投稿に加え、ライブ出品機能を利用してYouTube
            LiveやTwitch等の配信サービスのリンクを投稿し、予約販売を行うことができます。
          </li>
          <li>
            本サービスは、学習目的で提供されており、実際の金銭のやり取りは行われません。本サービス内での取引は架空のものであり、決済機能は提供されません。
          </li>
        </ol>
      </section>
      <section>
        <h2>第3条（アカウント登録）</h2>
        <ol>
          <li>本サービスを利用するには、ユーザー登録が必要です。</li>
          <li>
            ユーザーは、登録情報が正確かつ最新のものであることを保証するものとします。
          </li>
          <li>
            ユーザーによるアカウントの譲渡、貸与、共有は禁止されます。ただし、法人や団体の代表者変更等によりアカウントの引き継ぎが必要な場合は、運営者の事前承認を得ることで例外を認める場合があります。
          </li>
        </ol>
      </section>
      <section>
        <h2>第4条（禁止事項）</h2>
        <p>
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </p>
        <ol>
          <li>法令または公序良俗に違反する行為</li>
          <li>他のユーザーまたは第三者の権利を侵害する行為</li>
          {/* <li>虚偽の情報を登録または提供する行為</li> */}
          <li>本サービスの運営を妨害する行為</li>
          <li>不正アクセスや不正利用を行う行為</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </ol>
      </section>
      <section>
        <h2>第5条（コンテンツの取り扱い）</h2>
        <ol>
          <li>
            ユーザーが本サービスに投稿またはアップロードしたコンテンツ（以下、「投稿データ」）の著作権は、ユーザー自身に帰属します。
          </li>
          <li>
            ユーザーは、投稿データについて、本サービス内での使用に必要な範囲で運営者に利用を許諾するものとします。
          </li>
          <li>
            運営者は、投稿データが違法または本規約に違反すると判断した場合、当該データを削除または非公開にすることができます。
          </li>
        </ol>
      </section>
      <section>
        <h2>第6条（免責事項）</h2>
        <ol>
          <li>
            本サービスは、システムの運用・管理に努めますが、サービスの中断、停止、データの消失、バグ等による損害について、運営者は一切の責任を負いません。
          </li>
          <li>
            本サービスを利用したことにより生じたトラブルや紛争について、運営者は責任を負いません。
          </li>
          <li>
            ユーザー間の取引・コミュニケーションに関して、運営者は一切の関与をせず、責任を負いません。
          </li>
        </ol>
      </section>
      <section>
        <h2>第7条（利用規約の変更）</h2>
        <ol>
          <li>運営者は、必要に応じて本規約を変更できるものとします。</li>
          <li>
            本規約の変更を行う場合、変更内容を本サービス上に掲載し、効力発生の7日前までにユーザーへ通知します。
          </li>
          <li>
            変更後もユーザーが本サービスを利用した場合、変更後の規約に同意したものとみなします。
          </li>
        </ol>
      </section>
      <section>
        <h2>第8条（準拠法および裁判管轄）</h2>
        <ol>
          <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
          <li>
            本サービスに関する紛争については、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </li>
        </ol>
      </section>
      <p>以上</p>
      <section>
        <h2>改訂履歴</h2>
        <ul>
          <li>2025年2月18日 制定</li>
        </ul>
      </section>
    </Container>
  );
};

export default TermsPage;
