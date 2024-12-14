import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";

const FollowersPage = () => {
  const { id } = useParams();
  const { data: currentUser, isLoading: isUserLoading } = useGetUserById(id || "");

  if (isUserLoading || !currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (currentUser.followers.length === 0) {
    return (
      <div className="flex-center w-full h-full">
        <p className="text-light-3">No followers yet.</p>
      </div>
    );
  }

  return (
    <div className="followers-page-container">
      <h1 className="h3-bold md:h1-semibold text-light-1">
        Followers
      </h1>
      <div className="followers-list mt-5">
        {currentUser.followers.map((followerId: string) => (
          <FollowerItem key={followerId} followerId={followerId} />
        ))}
      </div>
    </div>
  );
};

const FollowerItem = ({ followerId }: { followerId: string }) => {
  const { data: follower, isLoading: isFollowerLoading } = useGetUserById(followerId);

  if (isFollowerLoading || !follower) {
    return (
      <div className="follower-item flex gap-4 items-center mb-4">
        <img
          src={`/assets/icons/profile-placeholder.svg`}
          alt="Loading..."
          className="w-10 h-10 rounded-full"
        />
        <p className="small-medium text-light-3">Loading...</p>
      </div>
    );
  }

  return (
    <Link
      to={`/profile/${follower.$id}`}
      className="follower-item flex gap-4 items-center mb-4 justify-start"
    >
      <img
        src={follower.imageUrl || `/assets/icons/profile-placeholder.svg`}
        alt={follower.name}
        className="w-10 h-10 rounded-full"
      />
      <p className="small-medium text-light-1">{follower.name}</p>
    </Link>
  );
};

export default FollowersPage;
