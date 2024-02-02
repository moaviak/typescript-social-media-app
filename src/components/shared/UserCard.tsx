import { Models } from "appwrite";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="user-card cursor-pointer"
      onClick={() => navigate(`/profile/${user.$id}`)}
    >
      <img
        src={user.imageUrl}
        alt="user"
        className="rounded-full h-24 w-24 object-cover"
      />
      <div>
        <p className="body-bold">{user.name}</p>
        <p className="small-regular text-light-3">@{user.username}</p>
      </div>
      <Button className="shad-button_primary px-8">Follow</Button>
    </div>
  );
};
export default UserCard;
