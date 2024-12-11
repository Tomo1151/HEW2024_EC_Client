"use client";
import { ThemeProvider } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";
import { useUserContext } from "@/context/UserContext";
import Post from "@/components/Post";
import PostCard from "@/components/PostCard";

const CartPage = () => {
  const fallback_image = "https://placeholder.com/150";
  const { cartItems } = useUserContext();
  console.log("cartItems", cartItems);

  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">カート</h3>
      </MainColumnHeader>
      {cartItems &&
        cartItems.map((item) => (
          <PostCard
            key={item.id}
            created_at={item.created_at}
            image_link={
              `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${item.product.thumbnail_link}` ||
              fallback_image
            }
            sellerName={
              item.product.post.author.nickname ||
              item.product.post.author.username
            }
            sellerIcon={item.product.post.author.icon_link || fallback_image}
            productName={item.product.name}
            content={item.product.post.content}
          />
        ))}
    </ThemeProvider>
  );
};

export default CartPage;
