import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { user } = useUserContext();

  const { data: savedPosts, isPending } = useGetSavedPosts(user.id);

  const posts =
    savedPosts?.documents.map((item: Models.Document) => item.post) || [];

  return (
    <div className="saved-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="save"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isPending ? (
          <Loader />
        ) : posts ? (
          <p>No Saved Posts</p>
        ) : (
          <GridPostList posts={posts} />
        )}
      </div>
    </div>
  );
};
export default Saved;
