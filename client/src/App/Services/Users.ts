import axios from '../Axios';
import { UserData } from '../Types';

const BASE_API = '/users';

const getUsers = () => axios.get<UserData[]>( BASE_API );

const getUser = ( idOrUsername: string ) => axios.get<UserData>( BASE_API.concat( '/', idOrUsername ));

export {
  getUsers,
  getUser
};
