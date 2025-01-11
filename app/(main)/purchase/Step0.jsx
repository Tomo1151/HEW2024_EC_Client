import Image from "next/image";

import { useUserContext } from "@/context/UserContext";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box } from "@mui/material";

const Step0 = () => {
  const { cartItems } = useUserContext();

  if (!cartItems) {
    return <CircularLoading />;
  }

  return (
    <>
      {cartItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            borderBottom: "1px solid #e0e0e0",
            px: { xs: 1, sm: 4 },
            py: 2,
            my: 2,
            columnGap: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ width: "100px", height: "100px", flexShrink: 0 }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${item.product.thumbnail_link}`}
              width={100}
              height={100}
              priority
              className="inline-block w-full h-full rounded-lg object-cover"
              alt="商品のサムネイル画像"
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <p className="text-xl font-bold">{item.product.name}</p>
            <p className="text-gray-500 font-bold">
              {item.product.post.author.nickname ||
                item.product.post.author.username}
            </p>
            <p className="font-bold">数量：１</p>
            <p className="text-lg text-red-500 font-bold">
              {isNaN(parseInt(item.product.price))
                ? "価格未設定"
                : parseInt(item.product.price).toLocaleString("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  })}
            </p>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Step0;
