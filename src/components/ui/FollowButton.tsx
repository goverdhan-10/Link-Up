import { useFollowUser } from '@/lib/react-query/queriesAndMutations';
import React, { useState } from 'react';


const FollowButton = ({ targetUserId, followers, currentUserId }: { targetUserId: string; followers: string[]; currentUserId: string }) => {
  const [currentFollowers, setCurrentFollowers] = useState<string[]>(followers);
  const followUserMutation = useFollowUser();

  const handleFollowUser = (e: React.MouseEvent) => {
    e.stopPropagation();

    let updatedFollowers = [...currentFollowers];
    const isFollowing = updatedFollowers.includes(currentUserId);

    if (isFollowing) {
      updatedFollowers = updatedFollowers.filter((id) => id !== currentUserId);
    } else {
      updatedFollowers.push(currentUserId);
    }

    setCurrentFollowers(updatedFollowers);

    followUserMutation.mutate({
      userId: targetUserId,
      followersArray: updatedFollowers,
    });
  };

  const isFollowing = currentFollowers.includes(currentUserId);

  return (
    <button
      onClick={handleFollowUser}
      className={`px-4 py-2 text-sm font-semibold rounded ${
        isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
