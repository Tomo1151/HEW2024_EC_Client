import Image from "next/image";
import Link from "next/link";

import { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useAuthContext } from "@/context/AuthContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import Product from "./Product";
import ProductPreview from "./ProductPreview";

export default function PostProductForm({ setRefresh }) {
  const { activeUser, refreshToken } = useAuthContext();
  const imagesRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [data, setData] = useState(null);
  const [price, setPrice] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      refreshToken().then(async () => {
        try {
          const formData = new FormData();
          formData.append("name", name.trim());
          formData.append("description", description.trim());
          formData.append("price", price.trim());
          formData.append("live_link", liveLink.trim());
          formData.append("data", data);

          for (let image of images) {
            formData.append("images", image);
          }

          console.log(...formData.entries());

          const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/products",
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(response.status);
          }
          const resJson = await response.json();

          if (resJson.success) {
            setName("");
            setDescription("");
            setPrice("");
            setLiveLink("");
            setImages([]);
            setData(null);

            // setRefresh((prev) => !prev);
            notifications.show("ポストが正常に投稿されました", {
              severity: "success",
              autoHideDuration: 3000,
            });
          } else {
            notifications.show("ポストの投稿に失敗しました", {
              severity: "error",
              autoHideDuration: 3000,
            });
          }
        } catch (error) {
          console.error("Post failed.", error);
        }
      });
    } catch (error) {
      console.error("Post failed.", error);
    }
  };

  const handleOnImageChange = (e) => {
    setImages([...images, ...e.target.files].slice(0, 4));
    e.target.value = "";
  };

  return (
    <Box
      component="section"
      maxWidth="md"
      sx={{
        // mx: 3,
        p: 4,
      }}
      className="rounded-b-md bg-white"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block font-bold mb-2">
          💡 投稿してみよう
        </label>
        <Box
          component="div"
          sx={{
            display: "flex",
            boxSizing: "border-box",
            gap: "5px",
            width: "100%",
          }}
        >
          <Box sx={{ flex: "1 1 50%" }}>
            <Link
              href={`/users/${activeUser?.username}`}
              className="inline-block h-fit hover:brightness-[.75] my-4 duration-200 shrink-0"
            >
              <Image
                src={
                  activeUser?.icon_link
                    ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${activeUser?.icon_link}`
                    : "https://placeholder.com/150"
                }
                width={50}
                height={50}
                alt="自分のユーザーアイコン"
                className="h-fit rounded-full"
              />
            </Link>
            <TextField
              id="name"
              name="name"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="商品名"
              label="商品名"
              onChange={(e) => setName(e.target.value)}
              sx={{ display: "block" }}
              value={name}
            />
            <Button
              component="label"
              variant="contained"
              className="relative"
              sx={[
                {
                  display: "block",
                  position: "relative",
                  backgroundColor: "#f0f0f0",
                  color: "#bbb",
                  borderRadius: ".375rem",
                  height: "13.25em",
                  my: 4,
                  cursor: "pointer",
                },
                images.length > 0 && {
                  backgroundImage: `url(${URL.createObjectURL(images[0])})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                },
              ]}
            >
              <input
                id="thumbnail"
                name="images"
                type="file"
                className="invisible absolute"
                accept="image/*"
                ref={imagesRef}
                onChange={handleOnImageChange}
                multiple
              />
              {images.length === 0 && "サムネイル画像を追加"}
              <AddCircleOutlineIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "2rem",
                }}
              />
            </Button>
            {images.length > 0 && (
              <div className="flex gap-x-4 p-2 mt-4 bg-slate-100 overflow-x-scroll rounded-md">
                {images.map((image, index) => {
                  return (
                    <Box
                      key={index}
                      className="relative w-1/5 h-[100px] shrink-0 rounded shadow-md"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt="投稿画像"
                        className="w-full h-full inset-0 object-cover rounded"
                      />
                      <CancelIcon
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-red-700"
                      />
                    </Box>
                  );
                })}
              </div>
            )}
            {images.length > 0 && (
              <div className="flex justify-center pt-4 mx-6 gap-x-4">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon></CloudUploadIcon>}
                  className="relative"
                  disabled={images.length >= 4}
                >
                  <input
                    type="file"
                    className="invisible absolute"
                    accept="image/*"
                    name="images"
                    ref={imagesRef}
                    onChange={handleOnImageChange}
                    multiple
                    disabled={images.length >= 4}
                  />
                  画像を追加
                </Button>

                <Button variant="outlined" onClick={() => setImages([])}>
                  画像をクリア
                </Button>
              </div>
            )}

            <Button
              component="label"
              variant="contained"
              className="relative"
              sx={{
                display: "block",
                position: "relative",
                backgroundColor: "#f0f0f0",
                color: data ? "#555" : "#bbb",
                borderRadius: ".375rem",
                mt: 4,
                cursor: "pointer",
              }}
            >
              <input
                id="data"
                name="data"
                type="file"
                className="invisible absolute"
                accept="application/zip"
                onChange={(e) => {
                  setData(e.target.files[0]);
                  e.target.value = "";
                }}
              />
              {data ? `${data.name}: ${data.size}` : "ファイルをアップロード"}
              <AddCircleOutlineIcon
                sx={{ position: "absolute", right: 8, color: "#bbb" }}
              />
            </Button>
            {data && (
              <div className="mt-4 text-center">
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    setData(null);
                  }}
                >
                  ファイルをクリア
                </Button>
              </div>
            )}
            <TextField
              id="price"
              name="price"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="2000"
              label="値段"
              onChange={(e) => setPrice(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={price}
            />
            <TextField
              id="description"
              name="description"
              variant="standard"
              rows={4}
              fullWidth
              multiline
              placeholder="商品の詳細"
              label="商品説明"
              onChange={(e) => setDescription(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={description}
            />
            <TextField
              id="live_link"
              name="live_link"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="https://example.com/live"
              label="ライブURL"
              onChange={(e) => setLiveLink(e.target.value)}
              sx={{ display: "block", mt: 2 }}
              value={liveLink}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ddd",
              flex: "1 1 50%",
              borderRadius: ".375rem",
            }}
          >
            <ProductPreview
              username={activeUser?.username}
              nickname={activeUser?.nickname}
              icon_link={activeUser?.icon_link}
              name={name}
              price={price}
              images={images}
              created_at={"たった今"}
            />
          </Box>
        </Box>
        <div className="flex justify-end pt-4 mt-2 gap-x-4">
          <Button type="submit" variant="contained" disabled={!description}>
            投稿する
          </Button>
        </div>
      </form>
    </Box>
  );
}
