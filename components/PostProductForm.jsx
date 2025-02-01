import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import TextInput from "@/components/TextInput";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useUserContext } from "@/context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import ProductDetailPreview from "./ProductDetailPreview";
import ProductPreview from "./ProductPreview";
import FormImagePreview from "./FormImagePreview";
import FormThumbnailImage from "./FormThumbnailImage";
import { urlForImage } from "@/utils/utils";
import { formatDataSize } from "@/utils/formatDataSize";
import { formatPostBody } from "@/utils/postBodyFormat";
import QuoteCard from "./QuoteCard";
import { inputValidator } from "@/utils/InputValidator";

export default function PostProductForm({ quoteRef, setRefresh }) {
  const router = useRouter();
  const notifications = useNotifications();
  const { activeUser, refreshToken } = useUserContext();

  const [formData, setFormData] = useState({
    name: { value: "", isValid: false },
    description: { value: "", isValid: false },
    // images: { value: [], isValid: false },
    tags: { value: [], isValid: true },
    tagInput: { value: "", isValid: false },
    data: { value: null, isValid: false },
    price: { value: "", isValid: true },
    liveLink: { value: "", isValid: true },
  });
  const [images, setImages] = useState({ value: [], isValid: false });

  const [status, setStatus] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [isValid, setIsValid] = useState(
    isLive
      ? formData.name.isValid &&
          formData.description.isValid &&
          formData.tags.isValid &&
          formData.liveLink.isValid
      : formData.name.isValid &&
          formData.description.isValid &&
          formData.tags.isValid &&
          images.isValid &&
          formData.data.isValid &&
          formData.price.isValid
  );
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [quotePost, setQuotePost] = useState(null);

  const fetchQuoteRef = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${quoteRef}`
      );
      const resJson = await response.json();

      if (resJson.success) {
        // console.log("Quote fetched: ", resJson.data);
        setQuotePost(resJson.data);
      } else {
        notifications.show("引用元のポストが見つかりません", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error("Quote fetch failed.", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted.");
    e.preventDefault();
    console.log("isProcessing: ", isProcessing);

    try {
      refreshToken().then(async () => {
        console.log(
          isLive,
          isValid,
          formData,
          images,
          isLive
            ? formData.name.isValid &&
                formData.description.isValid &&
                formData.tags.isValid &&
                formData.liveLink.isValid
            : formData.name.isValid &&
                formData.description.isValid &&
                formData.tags.isValid &&
                images.isValid &&
                formData.data.isValid &&
                formData.price.isValid
        );
        if (!isValid) {
          notifications.show("入力内容に不備があります", {
            severity: "error",
            autoHideDuration: 3000,
          });
          return;
        }
        setIsProcessing(true);
        const sendFormData = new FormData();
        sendFormData.append("type", isLive ? "live" : "product");
        sendFormData.append("name", formData.name.value.trim());
        sendFormData.append("description", formData.description.value.trim());
        if (quoteRef) sendFormData.append("quoted_ref", quoteRef);

        for (const tag of formData.tags.value) {
          sendFormData.append("tags[]", tag);
        }

        if (isLive) {
          sendFormData.append("live_link", formData.liveLink.value.trim());
        } else {
          if (formData.price.value)
            sendFormData.append("price", formData.price.value);
          sendFormData.append("data", formData.data.value);
          for (const image of images.value) {
            sendFormData.append("images", image);
          }
        }
        // @TODO imagesのisValidを適切に設定する

        // const formData = new FormData();
        // formData.append("name", name.trim());
        // formData.append("description", description.trim());
        // if (price) formData.append("price", price);
        // formData.append("live_link", liveLink.trim());
        // formData.append("data", data);
        // formData.append("quoted_ref", quoteRef);

        // for (const image of images) {
        //   formData.append("images", image);
        // }

        // for (const tag of tags) {
        //   formData.append("tags[]", tag);
        // }

        console.log(...sendFormData.entries());

        const response = await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/products",
          {
            method: "POST",
            body: sendFormData,
            credentials: "include",
          }
        );

        const resJson = await response.json();

        if (resJson.success) {
          // setName("");
          // setDescription("");
          // setPrice("");
          // setLiveLink("");
          // setImages([]);
          // setData(null);
          // setTags([]);
          // setStatus([]);

          if (setRefresh) setRefresh((prev) => !prev);
          notifications.show("ポストが正常に投稿されました", {
            severity: "success",
            autoHideDuration: 3000,
          });
          router.push(`/`, { scroll: false });
          // router.push(`/posts/${resJson.data.id}`, { scroll: false });
        } else {
          setStatus(resJson.error);
          setIsProcessing(false);
          notifications.show("ポストの投稿に失敗しました", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
      });
    } catch (error) {
      console.error("Post failed.", error);
      setIsProcessing(false);
    } finally {
    }
  };

  const handleOnImageChange = useCallback(
    (e) => {
      console.log(
        "Image changed: ",
        e.target.files,
        inputValidator([...images.value, ...e.target.files])
      );
      setImages({
        value: [...images.value, ...e.target.files],
        isValid: inputValidator("images", [...images.value, ...e.target.files]),
      });
      e.target.value = "";
    },
    [images]
  );

  const handleDeleteImage = useCallback(
    (index) => {
      setImages({
        value: images.value.filter((_, i) => i !== index),
        isValid: inputValidator(
          "images",
          images.value.filter((_, i) => i !== index)
        ),
      });
    },
    [images]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    // console.log({
    //   ...formData,
    //   [name]: { value, isValid: inputValidator(name, value) },
    // });

    const newFormData = {
      ...formData,
      [name]: { value, isValid: inputValidator(name, value) },
    };
    // validate(newFormData);
    setFormData(newFormData);
  };

  const handleSetTags = (e) => {
    // console.log(tagInput);
    if (e.key === "Enter") {
      e.preventDefault();

      if (!formData.tagInput.value || formData.tagInput.value.trim() === "")
        return;

      // console.log("Enter key pressed: ", `"${e.target.value}"`);
      const newTags = [...formData.tags.value, formData.tagInput.value.trim()];
      const uniqueTags = [...new Set(newTags)];
      // console.log({
      //   ...formData,
      //   tags: { value: uniqueTags, isValid: uniqueTags.length > 0 },
      //   tagInput: { value: "", isValid: false },
      // });
      setFormData({
        ...formData,
        tags: { value: uniqueTags, isValid: uniqueTags.length > 0 },
        tagInput: { value: "", isValid: false },
      });

      // setTags(uniqueTags);
      // setTagInput("");
    }
  };

  // const validate = (newFormData) => {

  // };

  useEffect(() => {
    if (quoteRef) {
      fetchQuoteRef();
    }
  }, [quoteRef]);

  useEffect(() => {
    setIsValid(
      isLive
        ? formData.name.isValid &&
            formData.description.isValid &&
            formData.tags.isValid &&
            formData.liveLink.isValid
        : formData.name.isValid &&
            formData.description.isValid &&
            formData.tags.isValid &&
            images.isValid &&
            formData.data.isValid &&
            formData.price.isValid
    );
  }, [formData, images, isLive]);

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
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
              <FormControlLabel
                control={<Switch />}
                label={
                  <Tooltip
                    title={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 0.5,
                        }}
                      >
                        <InfoOutlinedIcon />
                        <p>
                          ライブ出品の詳細は
                          <Link
                            href="https://google.com"
                            target="_blank"
                            className="underline"
                          >
                            こちら
                          </Link>
                          から
                        </p>
                      </Box>
                    }
                    placement="top"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 0.5,
                      }}
                    >
                      <LiveTvRoundedIcon sx={{ mb: 0.25 }} />
                      ライブ出品
                    </Box>
                  </Tooltip>
                }
                labelPlacement="end"
                sx={{ width: "fit-content" }}
                onChange={(e) => {
                  setIsLive(e.target.checked);
                  setFormData({
                    ...formData,
                    images: {
                      value: [],
                      isValid: e.target.checked ? true : false,
                    },
                    liveLink: {
                      value: "",
                      isValid: e.target.checked ? false : true,
                    },
                  });
                }}
              />
            </Box>
            <TextInput
              id="name"
              name="name"
              variant="standard"
              rows={4}
              fullWidth
              placeholder="商品名"
              label="商品名"
              onChange={handleChange}
              sx={{ display: "block" }}
              value={formData.name.value}
            />

            {!isLive && (
              <>
                <FormThumbnailImage
                  images={images.value}
                  onChange={handleOnImageChange}
                  // ref={imagesRef}
                />

                <FormImagePreview
                  images={images.value}
                  setImages={setImages}
                  deleteImage={handleDeleteImage}
                />

                {images.value.length > 0 && (
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
                        disabled={images.value.length >= 4}
                        sx={{ height: "100%" }}
                      >
                        <input
                          type="file"
                          className="invisible absolute w-full inset-0 h-full"
                          accept="image/*"
                          name="images"
                          onChange={handleOnImageChange}
                          multiple
                          disabled={images.value.length >= 4}
                        />
                        画像を追加
                      </Button>
                    </Box>
                    <Box sx={{ width: "fit-content" }}>
                      <Button
                        variant="outlined"
                        onClick={
                          () => setImages({ value: [], isValid: false })
                          // setFormData({
                          //   ...formData,
                          //   images: { value: [], isValid: false },
                          // })
                        }
                        sx={{ height: "100%" }}
                      >
                        画像をクリア
                      </Button>
                    </Box>
                  </div>
                )}

                <label
                  htmlFor="data"
                  className="inline-block text-[rgba(0,0,0,.6)] py-2"
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
                    color: formData.data.value ? "#555" : "#bbb",
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
                    accept="application/zip, application/x-zip-compressed, image/jpeg, image/png, image/gif, image/webp"
                    onChange={(e) => {
                      // setData(e.target.files[0]);
                      setFormData({
                        ...formData,
                        data: {
                          value: e.target.files[0],
                          isValid: inputValidator("data", e.target.files[0]),
                        },
                      });
                      e.target.value = "";
                    }}
                  />
                  {formData.data.value
                    ? `${formData.data.value.name}: ${formatDataSize(formData.data.value.size)}`
                    : "ファイルをアップロード"}
                  <AddCircleOutlineIcon
                    sx={{
                      position: "absolute",
                      right: 8,
                      color: "#bbb",
                    }}
                  />
                </Button>
                {formData.data.value && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        setFormData({
                          ...formData,
                          data: { value: null, isValid: false },
                        });

                        // setData(null);
                      }}
                    >
                      ファイルをクリア
                    </Button>
                  </div>
                )}
                <TextInput
                  id="price"
                  name="price"
                  variant="standard"
                  type="number"
                  rows={4}
                  fullWidth
                  placeholder="2000"
                  label="値段"
                  onChange={handleChange}
                  sx={{ display: "block", mt: 2 }}
                  value={formData.price.value}
                />
              </>
            )}

            <TextInput
              id="description"
              name="description"
              variant="standard"
              rows={4}
              fullWidth
              multiline
              placeholder={isLive ? "ライブ配信の詳細" : "商品の詳細"}
              label={isLive ? "ライブの説明" : "商品説明"}
              onChange={handleChange}
              sx={{ display: "block", mt: 2 }}
              value={formData.description.value}
            />

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <TextInput
                id="tags"
                name="tagInput"
                variant="standard"
                rows={1}
                fullWidth
                label="タグ"
                placeholder="Enterまたは右のボタンで追加"
                // sx={{ mt: 2 }}
                value={formData.tagInput.value}
                onChange={handleChange}
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
            {formData.tags.value && formData.tags.value.length > 0 && (
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
                {formData.tags.value.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`# ${tag}`}
                    color="primary"
                    onDelete={() => {
                      setFormData({
                        ...formData,
                        tags: {
                          value: formData.tags.value.filter((t) => t !== tag),
                          isValid: formData.tags.value.length > 0,
                        },
                      });
                      // setTags(formData.tags.filter((t) => t !== tag));
                    }}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}

            {isLive && (
              <TextInput
                id="live_link"
                name="liveLink"
                variant="standard"
                rows={4}
                fullWidth
                placeholder="https://www.youtube.com/live/xxxxxxxxxxx"
                label="ライブURL (YouTube/Twitch)"
                onChange={handleChange}
                sx={{ display: "block", mt: 2 }}
                value={formData.liveLink.value}
              />
            )}

            <FormControlLabel
              control={<Switch />}
              label="投稿イメージのプレビューを表示"
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
                  name={formData.name.value}
                  price={formData.price.value}
                  tags={formData.tags.value}
                  images={images.value}
                  quoted_ref={quotePost}
                  live_link={formData.liveLink.value}
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
                  content={formData.description.value}
                  name={formData.name.value}
                  price={formData.price.value}
                  tags={formData.tags.value}
                  images={images.value}
                  quoted_ref={quotePost}
                  live_link={formData.liveLink.value}
                />
              </Box>
            </Box>
          )}
        </Box>

        {quoteRef && (
          <>
            <p className="text-gray-500 font-bold mt-4">引用元のポスト</p>
            <QuoteCard
              image_link={
                quotePost &&
                quotePost.images.length > 0 &&
                urlForImage(quotePost.images[0].image_link, "images")
              }
              author_name={quotePost && quotePost.author.username}
              author_icon={
                quotePost && urlForImage(quotePost.author?.icon_link, "icons")
              }
              post_content={quotePost && formatPostBody(quotePost.content)}
              post_link={quotePost && `/posts/${quotePost.id}`}
              is_loading={quotePost === null}
            />
          </>
        )}

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
            disabled={
              isLive
                ? !(
                    formData.name.isValid &&
                    formData.description.isValid &&
                    formData.tags.isValid &&
                    formData.liveLink.isValid
                  )
                : !(
                    formData.name.isValid &&
                    formData.description.isValid &&
                    formData.tags.isValid &&
                    images.isValid &&
                    formData.data.isValid &&
                    formData.price.isValid
                  )
            }
            loading={isProcessing}
          >
            投稿する
          </LoadingButton>
        </div>
      </form>
    </Box>
  );
}
