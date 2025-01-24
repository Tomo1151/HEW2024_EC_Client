import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";

import { useUserContext } from "@/context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import ProductDetailPreview from "./ProductDetailPreview";
import ProductPreview from "./ProductPreview";
import FormImagePreview from "./FormImagePreview";
import FormThumbnailImage from "./FormThumbnailImage";
import { urlForImage } from "@/utils/utils";
import { formatDataSize } from "@/utils/formatDataSize";
export default function PostProductForm({ setRefresh }) {
  const router = useRouter();
  const { activeUser, refreshToken } = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [data, setData] = useState(null);
  const [price, setPrice] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [status, setStatus] = useState([]);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const notifications = useNotifications();

  const handleSetTags = (e) => {
    console.log(tagInput);
    if (e.key === "Enter") {
      e.preventDefault();

      if (!tagInput || tagInput.trim() === "") return;

      // console.log("Enter key pressed: ", `"${e.target.value}"`);
      const newTags = [...tags, tagInput.trim()];
      const uniqueTags = [...new Set(newTags)];
      setTags(uniqueTags);
      setTagInput("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("isProcessing: ", isProcessing);

    try {
      refreshToken().then(async () => {
        setIsProcessing(true);
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("description", description.trim());
        if (price) formData.append("price", price);
        formData.append("live_link", liveLink.trim());
        formData.append("data", data);

        for (const image of images) {
          formData.append("images", image);
        }

        for (const tag of tags) {
          formData.append("tags[]", tag);
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

        const resJson = await response.json();

        if (resJson.success) {
          setName("");
          setDescription("");
          setPrice("");
          setLiveLink("");
          setImages([]);
          setData(null);
          setTags([]);
          setStatus([]);

          if (setRefresh) setRefresh((prev) => !prev);
          notifications.show("ポストが正常に投稿されました", {
            severity: "success",
            autoHideDuration: 3000,
          });

          router.push(`/`, { scroll: false });
          // router.push(`/posts/${resJson.data.id}`, { scroll: false });
        } else {
          setStatus(resJson.error);
          notifications.show("ポストの投稿に失敗しました", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
      });
    } catch (error) {
      console.error("Post failed.", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOnImageChange = useCallback(
    (e) => {
      setImages([...images, ...e.target.files].slice(0, 4));
      e.target.value = "";
    },
    [images]
  );

  return (
    <Box
      component="section"
      maxWidth="md"
      sx={{
        // mx: 3,
        p: { xs: 2, sm: 4 },
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
            flexDirection: "column",
            boxSizing: "border-box",
            gap: "5px",
            width: "100%",
            mb: status.length > 0 ? 4 : 0,
          }}
        >
          <Box
            sx={
              {
                // flex: "1 1 50%",
              }
            }
          >
            <Link
              href={`/users/${activeUser?.username}`}
              className="inline-block h-fit hover:brightness-[.75] my-4 duration-200 shrink-0"
            >
              <Image
                src={urlForImage(activeUser?.icon_link)}
                width={50}
                height={50}
                alt="自分のユーザーアイコン"
                className="w-[50px] h-[50px] rounded-full object-cover"
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
            <FormThumbnailImage
              images={images}
              onChange={handleOnImageChange}
              // ref={imagesRef}
            />

            <FormImagePreview images={images} setImages={setImages} />

            {images.length > 0 && (
              <div className="flex justify-around sm:justify-center pt-4 mx-0 sm:mx-6 sm:gap-x-4">
                <Box sx={{ width: "fit-content" }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={
                      <Box
                        sx={{
                          display: { xs: "none", sm: "block" },
                          width: "fit-content",
                        }}
                      >
                        <CloudUploadIcon />
                      </Box>
                    }
                    className="relative"
                    disabled={images.length >= 4}
                    sx={{ height: "100%" }}
                  >
                    <input
                      type="file"
                      className="invisible absolute w-full inset-0 h-full"
                      accept="image/*"
                      name="images"
                      onChange={handleOnImageChange}
                      multiple
                      disabled={images.length >= 4}
                    />
                    画像を追加
                  </Button>
                </Box>
                <Box sx={{ width: "fit-content" }}>
                  <Button
                    variant="outlined"
                    onClick={() => setImages([])}
                    sx={{ height: "100%" }}
                  >
                    画像をクリア
                  </Button>
                </Box>
              </div>
            )}

            <label
              htmlFor="data"
              className="inline-block text-sm text-[rgba(0,0,0,.6)] py-2"
            >
              商品データ
            </label>
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
                // mt: 4,
                width: "100%",
                cursor: "pointer",
              }}
            >
              <input
                id="data"
                name="data"
                type="file"
                className="invisible absolute w-full inset-0 h-full cursor-pointer"
                accept="application/zip"
                onChange={(e) => {
                  setData(e.target.files[0]);
                  e.target.value = "";
                }}
              />
              {data
                ? `${data.name}: ${formatDataSize(data.size)}`
                : "ファイルをアップロード"}
              <AddCircleOutlineIcon
                sx={{
                  position: "absolute",
                  right: 8,
                  color: "#bbb",
                }}
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
              type="number"
              rows={4}
              fullWidth
              placeholder="2000"
              label="値段"
              onChange={(e) =>
                setPrice(Math.min(Math.max(e.target.value, 0), 999999))
              }
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

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <TextField
                id="tag"
                variant="standard"
                rows={1}
                fullWidth
                label="タグ"
                placeholder="タグを入力（複数可）"
                // sx={{ mt: 2 }}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleSetTags}
              />
              <Button
                type="button"
                color="black"
                onClick={() =>
                  handleSetTags({ key: "Enter", preventDefault: () => {} })
                }
                sx={{ mt: 2 }}
              >
                追加
              </Button>
            </Box>
            {tags && tags.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  backgroundColor: "#f0f0f0",
                  p: 1,
                  my: 2,
                  borderRadius: "0.375em",
                }}
              >
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`# ${tag}`}
                    color="primary"
                    onDelete={() => {
                      setTags(tags.filter((t) => t !== tag));
                    }}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}

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
            <FormControlLabel
              control={<Switch />}
              label="プレビュー"
              labelPlacement="start"
              sx={{ display: { xs: "none", sm: "block" }, mt: 4, ml: 0 }}
              onChange={(e) => setIsPreviewActive(e.target.checked)}
            />
          </Box>

          {isPreviewActive && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                backgroundColor: "#f0f0f0",
                // flex: "1 1 50%",
                borderRadius: ".375rem",
                borderTop: "1px solid #f0f0f0",
                borderBottom: "1px solid #f0f0f0",
                pt: 2,
                pb: 4,
                rowGap: "1rem",
              }}
            >
              <Box sx={{ backgroundColor: "#f0f0f0" }}>
                <p className="flex items-center w-fit font-bold text-gray-400 bg-white mt-2 pt-2 px-2 rounded-tr-md">
                  <PreviewIcon />
                  プレビュー（タイムライン）
                </p>
                <ProductPreview
                  username={activeUser?.username}
                  nickname={activeUser?.nickname}
                  icon_link={activeUser?.icon_link}
                  name={name}
                  price={price}
                  tags={tags}
                  images={images}
                  created_at={"たった今"}
                />
              </Box>
              <Box sx={{ backgroundColor: "#f0f0f0" }}>
                <p className="flex items-center w-fit font-bold text-gray-400 bg-white pt-2 px-2 rounded-tr-md">
                  <PreviewIcon />
                  プレビュー（ポスト画面）
                </p>
                <ProductDetailPreview
                  username={activeUser?.username}
                  nickname={activeUser?.nickname}
                  icon_link={activeUser?.icon_link}
                  content={description}
                  name={name}
                  price={price}
                  tags={tags}
                  images={images}
                  created_at={"たった今"}
                />
              </Box>
            </Box>
          )}
        </Box>

        {status &&
          status.map((message, index) => (
            <p key={index} className="text-center text-red-600 font-bold">
              {message}
            </p>
          ))}

        <div className="flex justify-end pt-4 mt-2 gap-x-4">
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!description}
            loading={isProcessing}
          >
            投稿する
          </LoadingButton>
        </div>
      </form>
    </Box>
  );
}
