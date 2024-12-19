import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  children,
  image_link,
  sellerName,
  sellerIcon,
  created_at,
}) => {
  return (
    <>
      <div className="mb-4 mx-4">
        <h2 className="text-xl pb-2">{created_at}</h2> {/* 購入日付 */}
        <div className="bg-white border border-[#e0e0e0] rounded-xl flex  p-4 hover:brightness-[.95] duration-200">
          <div className="w-4/12 mr-3.5">
            <Image
              src={image_link}
              alt="商品画像"
              width={240}
              height={240}
              className="rounded-md h-full object-cover aspect-square"
              priority
            />
          </div>
          <div className="w-8/12 ml-3">
            {/* ユーザー情報 */}
            <div className="flex items-center pb-3">
              <Image
                src={sellerIcon}
                alt="アイコン"
                className="rounded-full mr-3 w-[50px] h-[50px]"
                width={50}
                height={50}
              />
              <p className="font-bold tracking-[.075em]">{sellerName}</p>
            </div>
            {children}
            {/* <h2 className="text-lg ml-1 pb-2">{productName}</h2> 商品名 */}
            {/* <p className="ml-1">{content}</p> 商品詳細 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
