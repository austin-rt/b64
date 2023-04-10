import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL, API_ENDPOINTS } from '@/constants/consts';
import { useAppSelector } from '@/redux/store';

const Nav = () => {
  const user = useAppSelector(state => state.UserSlice.user);

  return !!user.name ? (
    <nav>
      <div>hello, {user.name}</div>
      <Image
        src={user.avatar}
        width={100}
        height={100}
        alt={`${user.name}'s profile picture`}
        unoptimized
      />
      <ul>
        <li>
          <Link href={`${BASE_URL.API}/${API_ENDPOINTS.AUTH.GOOGLE.LOGOUT}`}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav>
      <ul>
        <li>
          <Link href={`${BASE_URL.API}/${API_ENDPOINTS.AUTH.GOOGLE.LOGIN}`}>
            Login With Google
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
