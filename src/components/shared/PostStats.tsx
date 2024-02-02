import React, { useEffect, useState, useTransition } from "react";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const [isSavePending, startSaveTransition] = useTransition();

  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isLiked, setIsLiked] = useState(() => checkIsLiked(likesList, userId));
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  useEffect(() => {
    setIsLiked(() => checkIsLiked(likesList, userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLikingPost) return;

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      setIsLiked(false);
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      setIsLiked(true);
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isDeletingSaved || isSavingPost || isSavePending) return;

    setIsSaved(!isSaved);

    startSaveTransition(() => {
      if (savedPostRecord) {
        deleteSavedPost(savedPostRecord.$id);
      } else {
        savePost({ postId: post?.$id || "", userId });
      }
    });
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
export default PostStats;
