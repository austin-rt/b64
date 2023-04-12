import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

const Profile = () => {
  const user = useAppSelector(state => state.UserSlice.user);

  return (
    <div>
      <Image
        src={user.avatar}
        width={200}
        height={200}
        unoptimized
        alt={`${user.name} avatar`}
      />
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>
        {user.images.map(image => (
          <div key={image.fileName}>
            <Image
              src={image.dataURI}
              width={200}
              height={200}
              unoptimized
              alt={`${image.fileName}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
