import ArrowBackButton from "@/components/ArrowBackButton";
import Image from "next/image";
import Link from "next/link";

export default function PurchaseHistory(props) {
  return (
    <>
      <main>
        <div className="flex">
          <ArrowBackButton />
          <h2>購入履歴</h2>
        </div>
        <div className="w-4/5 mx-auto">
          <h2>購入日付</h2>
          <div className="border border-gray-400 rounded-lg flex">
            <div className="w-4/12">
              <Image
                src="https://placeholder.com/150"
                alt="商品画像"
                width={210}
                height={210}
              />
            </div>
            <div className="w-8/12">
              <div>売者ユーザー情報</div>
              <h2>タイトル</h2>
              <p>商品詳細</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
