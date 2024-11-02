import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";

import PostReaction from "./PostReaction";

import { useAuthContext } from "../context/AuthContext";
import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";

const Post = ({
	type,
	repost_user,
	postId,
	username,
	nickname,
	icon_link,
	content,
	comment_count,
	ref_count,
	like_count,
	created_at,
	is_reposted,
	is_liked,
	is_clickable = true,
	setRefresh,
}) => {
	const { activeUser } = useAuthContext();
	const [isReposted, setisReposted] = useState(is_reposted);
	const [isLiked, setisLiked] = useState(is_liked);
	const [repostCount, setRepostCount] = useState(ref_count);
	const [likeCount, setLikeCount] = useState(like_count);

	// if (!isReposted && type === "repost") return null;
	let options = {};
	if (activeUser.username === username) {
		options = {
			"通報": () => {
				console.log("ポストを通報");
			},
			"削除": async () => {
				console.log(`ポストを削除: ${postId}`);
				await deletePost();
			},
		};
	} else {
		options = {
			"通報": () => {
				console.log("ポストを通報");
			},
		};
	}

	const deletePost = async () => {
		try {
			const response = await fetch(fetchBaseURL + `/posts/${postId}`, {
				method: "DELETE",
				headers: fetchHeaders,
				credentials: "include",
			});
			const resJson = await response.json();

			if (resJson.success) {
				setRefresh((prev) => !prev);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<section className="relative bg-white my-8 p-8 shadow-lg rounded-md">
			{is_clickable && (
				<Link
					href={`/posts/${postId}`}
					className="absolute inset-0 w-full h-full z-10"
				/>
			)}
			{type === "repost" && (
				<p className="font-bold pb-4 text-gray-300">
					{repost_user.nickname || repost_user.username}がリポストしました
				</p>
			)}
			<div className="flex relative">
				<IconButton
					sx={{ position: "absolute", top: 0, right: 0, zIndex: "19" }}
					onClick={handleClick}
				>
					<MoreHorizRounded sx={{ fontSize: 30 }} />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					slotProps={{
						paper: {
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&::before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						},
					}}
				>
					{Object.keys(options).map((key) => (
						<MenuItem
							key={key}
							onClick={() => {
								options[key]();
								handleClose();
							}}
						>
							{key}
						</MenuItem>
					))}
				</Menu>
				<div>
					<Link
						href={`/users/${username}`}
						className="h-fit hover:brightness-[.75] rounded-full duration-200"
					>
						<Image
							src={icon_link || "https://placeholder.com/150"}
							width="50"
							height="50"
							className="rounded-full mr-4"
							alt="ユーザーアイコン"
						/>
					</Link>
				</div>
				<div className="px-2 grow">
					<div>
						<Link
							href={`/users/${username}`}
							className="font-bold hover:underline tracking-[.075em]"
						>
							{nickname || username}
						</Link>
						<p className="select-none font-bold opacity-35">
							{new Date(created_at).toLocaleString("ja-JP")}
						</p>
					</div>
					<p className="mt-2 pb-2">{content}</p>
					<PostReaction
						postId={postId}
						comment_count={comment_count}
						ref_count={repostCount}
						setRepostCount={setRepostCount}
						like_count={likeCount}
						setLikeCount={setLikeCount}
						is_reposted={isReposted}
						setReposted={setisReposted}
						is_liked={isLiked}
						setLiked={setisLiked}
						setRefresh={setRefresh}
					/>
				</div>
			</div>
		</section>
	);
};

export default Post;
