import { useUser } from '@/ContextProvider/Provider';
import { useEffect } from 'react';

const ManageUserInfo = () => {
  // const [userInfo, setUserInfo] = useState([]);
  const { base_url } = useUser();

  //   TODO: create manage user info functionality

  useEffect(() => {
    const getUserInfo = async () => {
      // const res = await getDataFromDB(`${base_url}/users`);
    };

    getUserInfo();
  }, [base_url]);

  return <div>ManageUserInfo</div>;
};

export default ManageUserInfo;
