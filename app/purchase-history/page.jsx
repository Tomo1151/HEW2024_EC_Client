import ArrowBackButton from "@/components/ArrowBackButton";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import MainColumnHeader from "@/components/MainColumnHeader";

export default function PurchaseHistory(props) {
  const tentative = [
    {
      purchase_price: 3000,
      created_at: "2024-12-04T05:56:28.283Z",
      user: {
        username: "test_user_0",
        nickname: "テストユーザー0",
        icon_link: "https://placeholder.com/150",
      },
      product: {
        name: "商品_0",
        price: 3100,
        post: {
          content: "商品_0についての説明",
          images: [
            {
              image_link: "https://placeholder.com/150",
            },
          ],
          author: {
            username: "test_user_1",
            nickname: "テストユーザー1",
            icon_link: "https://placeholder.com/150",
          },
        },
      },
    },
    {
      purchase_price: 3200,
      created_at: "2024-12-04T05:56:28.283Z",
      user: {
        username: "test_user_1",
        nickname: "テストユーザー1",
        icon_link: "https://placeholder.com/150",
      },
      product: {
        name: "商品1名 ABCDEFG",
        price: 3160,
        post: {
          content: "商品_1についての説明",
          images: [
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
          ],
          author: {
            username: "test_user_0",
            nickname: "テストユーザー0",
            icon_link: "https://placeholder.com/150",
          },
        },
      },
    },
    {
      purchase_price: 31200,
      created_at: "2024-12-04T05:56:28.283Z",
      user: {
        username: "test_user_2",
        nickname: "テストユーザー2",
        icon_link: "https://placeholder.com/150",
      },
      product: {
        name: "商品名2 ABCDEFGHIJ",
        price: 3160,
        post: {
          content: "商品_2についての説明",
          images: [
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
          ],
          author: {
            username: "test_user_1",
            nickname: "テストユーザー1",
            icon_link: "https://placeholder.com/150",
          },
        },
      },
    },
    {
      purchase_price: 312100,
      created_at: "2024-12-04T05:56:28.283Z",
      user: {
        username: "test_user_3",
        nickname: "テストユーザー3",
        icon_link: "https://placeholder.com/150",
      },
      product: {
        name: "商品名3 ABCDEFGHIJ",
        price: 3160,
        post: {
          content: "商品_3についての説明",
          images: [
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
            {
              image_link: "https://placeholder.com/150",
            },
          ],
          author: {
            username: "test_user_1",
            nickname: "テストユーザー1",
            icon_link: "https://placeholder.com/150",
          },
        },
      },
    },
  ];
  // tentative.map((user) => console.log(user));

  return (
    <section className="bg-white">
      <MainColumnHeader className="font-bold tracking-wider">
        <h3>購入履歴</h3>
      </MainColumnHeader>
      {tentative.map((buyHistory, index) => (
        <PostCard
          key={index}
          created_at={buyHistory.created_at} //購入日付
          image_link={buyHistory.product.post.images[0].image_link} //画像イメージ
          sellerName={buyHistory.product.post.author.username} //売り手の名前
          sellerIcon={buyHistory.product.post.author.icon_link} //売り手のアイコン
          productName={buyHistory.product.name} //売り物の名前
          content={buyHistory.product.post.content} //売り物の詳細
        ></PostCard>
      ))}
    </section>
  );
}
