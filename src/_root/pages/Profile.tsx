import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  useGetCurrentUser,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

enum PROFILE_TABS {
  POST_TAB = "posts",
  LIKE_TAB = "likes",
}

const Profile = () => {
  const [tab, setTab] = useState(PROFILE_TABS.POST_TAB);

  const { id } = useParams();
  const { data: currentUser, isPending: isCurrentUserPending } =
    useGetCurrentUser();
  const { data: user, isPending: isUserPending } = useGetUserById(id || "");

  const navigate = useNavigate();

  if (isCurrentUserPending || isUserPending) return <Loader />;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          src={user?.imageUrl}
          alt="user"
          className="rounded-full h-[150px] w-[150px] object-cover"
        />

        <div className="flex flex-col gap-8 my-4">
          <div className="flex-center gap-4 md:gap-12">
            <div>
              <h1 className="h3-bold md:h1-bold">{user?.name}</h1>
              <p className="small-regular text-light-3">@{user?.username}</p>
            </div>
            {currentUser?.$id === user?.$id ? (
              <Button
                className="bg-dark-4 px-4 flex gap-2 md:gap-4 items-center justify-start hover:bg-transparent hover:text-white"
                onClick={() => navigate(`/update-profile/${user?.$id}`)}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  className="h-5 w-5"
                />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 md:gap-4">
                <Button className="shad-button_primary">Follow</Button>
                <Button className="shad-button_light">Message</Button>
              </div>
            )}
          </div>

          <div className="flex justify-center md:justify-normal gap-10">
            <div>
              <p className="text-primary-500 base-semibold md:text-[20px]">
                {user?.posts.length}
              </p>
              <p className="base-medium md:text-[18px]">Posts</p>
            </div>
            <div>
              <p className="text-primary-500 base-semibold md:text-[20px]">
                147
              </p>
              <p className="base-medium md:text-[18px]">Followers</p>
            </div>
            <div>
              <p className="text-primary-500 base-semibold md:text-[20px]">
                151
              </p>
              <p className="base-medium md:text-[18px]">Following</p>
            </div>
          </div>

          <div>
            <p>{user?.bio || "Set your bio."}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full rounded-2xl">
        <div
          className={`profile-tab rounded-s-2xl cursor-pointer ${
            tab === PROFILE_TABS.POST_TAB ? "bg-dark-3" : "bg-dark-2"
          }`}
          onClick={() => setTab(PROFILE_TABS.POST_TAB)}
        >
          <img src="/assets/icons/posts.svg" alt="your-posts" />
          <p className="base-medium">Posts</p>
        </div>
        <div
          className={`profile-tab rounded-e-2xl cursor-pointer ${
            tab === PROFILE_TABS.LIKE_TAB ? "bg-dark-3" : "bg-dark-2"
          }`}
          onClick={() => setTab(PROFILE_TABS.LIKE_TAB)}
        >
          <img src="/assets/icons/like.svg" alt="your-posts" />
          <p className="base-medium">Liked</p>
        </div>
      </div>

      <div>
        <GridPostList
          posts={tab === PROFILE_TABS.POST_TAB ? user?.posts : user?.liked}
          showStats={false}
          showUser={false}
        />
      </div>
    </div>
  );
};
export default Profile;
