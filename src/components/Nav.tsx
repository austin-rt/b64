import Link from 'next/link';
import { BASE_URL, API_ENDPOINTS } from '@/constants/consts';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={`${BASE_URL.API}/${API_ENDPOINTS.AUTH.GOOGLE.LOGIN}`}>
            Login With Google
          </Link>
        </li>
        <li>
          <Link href={`${BASE_URL.API}/${API_ENDPOINTS.AUTH.GOOGLE.LOGOUT}`}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
