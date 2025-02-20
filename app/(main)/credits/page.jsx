import MainColumnHeader from "@/components/MainColumnHeader";
import { Container } from "@mui/material";
import Link from "next/link";

const CreditsPage = () => {
  return (
    <>
      <MainColumnHeader>
        <h3>デベロッパー</h3>
      </MainColumnHeader>

      <Container sx={{ fontFamily: "monospace" }}>
        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">τomo</h4>
          <p className="text-md py-2">リンク / 連絡先</p>
          <ul className="list-none">
            <li className="before:content-['-'] before:mr-2">
              HP:{" "}
              <Link
                href="https://syntck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                syntck.com
              </Link>
            </li>
            <li className="before:content-['-'] before:mr-2">
              GitHub:{" "}
              <Link
                href="https://github.com/Tomo1151"
                target="_"
                rel="noopener noreferrer"
                className="underline"
              >
                Tomo1151
              </Link>
            </li>
            <li className="before:content-['-'] before:mr-2">
              Twitter:{" "}
              <Link
                href="https://twitter.com/tomo_1151"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @Tomo_1151
              </Link>
            </li>
            <li className="before:content-['-'] before:mr-2">
              Qiita:{" "}
              <Link
                href="https://qiita.com/Tomo_1151"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Tomo_1151
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">田中健吾</h4>
        </section>
        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">rkk</h4>
        </section>
        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">honoka</h4>
          <p className="text-md py-2">リンク / 連絡先</p>
          <ul className="list-none">
            <li className="before:content-['-'] before:mr-2">
              Twitter:{" "}
              <Link
                href="https://twitter.com/tnecslias"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @tnecslias
              </Link>
            </li>
          </ul>
        </section>
        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">しょうき</h4>
        </section>
        <section className="mt-8">
          <h4 className="text-xl border-l-8 border-[#6dc965] pl-2">野中太一</h4>
        </section>
      </Container>
    </>
  );
};

export default CreditsPage;
