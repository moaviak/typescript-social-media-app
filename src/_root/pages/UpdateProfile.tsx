import Loader from "@/components/shared/Loader";
import ProfileForm from "@/components/forms/ProfileForm";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id: userId } = useParams();

  const { data: user, isPending: isUserPending } = useGetUserById(userId || "");

  if (isUserPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/edit.svg" width={36} height={36} alt="add" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  );
};
export default UpdateProfile;
