import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const AllUsers = () => {
  const { data: creators, isPending } = useGetUsers();

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="save"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold w-full">All Users</h2>
        </div>

        {isPending ? (
          <Loader />
        ) : (
          <div className="user-grid">
            {creators?.documents.map((user: Models.Document) => (
              <UserCard key={user.$id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AllUsers;
