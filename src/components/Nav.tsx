import Link from 'next/link';
import { BASE_URL, API_ENDPOINTS } from '@/constants/conts';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={`${BASE_URL.API}/${API_ENDPOINTS.AUTH.GOOGLE}`}>
            Login With Google
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
