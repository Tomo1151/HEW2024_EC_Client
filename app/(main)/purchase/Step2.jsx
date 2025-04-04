import Image from "next/image";

import { useUserContext } from "@/context/UserContext";
import CircularLoading from "@/components/loading/CircularLoading";
import { Box, Button } from "@mui/material";
import { urlForImage } from "@/utils/utils";
import { formatPrice } from "@/utils/formatPrice";

const Step2 = ({ setActiveStep }) => {
  const { cartItems } = useUserContext();

  if (!cartItems) {
    return <CircularLoading />;
  }

  return (
    <>
      <Box
        sx={{
          px: 4,
          py: 2,
        }}
      >
        <h3 className="text-xl font-bold">購入商品確認</h3>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
            <p className="text-lg font-bold">商品合計：</p>
            <p className="text-lg text-red-500 font-bold">
              {cartItems
                .map((item) => parseInt(item.product.price_histories[0].price))
                .reduce((acc, cur) => acc + cur, 0)
                .toLocaleString("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                })}
            </p>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
            <p className="text-lg font-bold">サービス利用料：</p>
            <p className="text-lg text-red-500 font-bold">
              {(0).toLocaleString("ja-JP", {
                style: "currency",
                currency: "JPY",
              })}
            </p>
          </Box>
          <hr />
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
            <p className="text-lg font-bold">お支払い金額：</p>
            <p className="text-lg text-red-500 font-bold">
              {cartItems
                .map((item) => parseInt(item.product.price_histories[0].price))
                .reduce((acc, cur) => acc + cur, 0)
                .toLocaleString("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                })}
            </p>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", px: 4, py: 2 }}>
        <Button variant="contained" onClick={() => setActiveStep(3)}>
          購入を確定する
        </Button>
      </Box>

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
              src={urlForImage(item.product.thumbnail_link, "images")}
              width={100}
              height={100}
              priority
              className="inline-block w-full h-full rounded-lg object-cover"
              alt="商品のサムネイル画像"
            />
          </Box>
          <Box>
            <p className="text-xl font-bold">{item.product.name}</p>
            <p className="text-gray-500 font-bold">
              {item.product.post.author.nickname ||
                item.product.post.author.username}
            </p>
            <p className="font-bold">数量：１</p>
            <p className="text-lg text-red-500 font-bold">
              {formatPrice(item.product.price_histories[0].price)}
            </p>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Step2;
