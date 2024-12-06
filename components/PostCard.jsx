import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  created_at,
  image_link,
  sellerName,
  sellerIcon,
  productName,
  content,
}) => {
  return (
    <>
      <div className="w-4/5 mx-auto my-16">
        <h2 className="text-xl pb-2">{created_at}</h2> {/* 購入日付 */}
        <div className="border border-gray-400 rounded-3xl flex  p-4">
          <div className="w-4/12 mr-3.5">
            <Image
              src={image_link}
              alt="商品画像"
              width={240}
              height={240}
              className="rounded-3xl"
            />
          </div>
          <div className="w-8/12 ml-3">
            {" "}
            {/* ユーザー情報 */}
            <div className="flex items-center pb-3">
              <img
                src={sellerIcon}
                alt="アイコン"
                className="rounded-full mr-5"
                width={50}
                height={50}
              />
              <p className="text-2xl">{sellerName}</p>
            </div>
            <h2 className="text-xl ml-1">{productName}</h2> {/* 商品名*/}
            <p className="ml-1">{content}</p> {/* 商品詳細 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
