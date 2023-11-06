import { useAuth } from './providers/auth.provider';
import Auth from './pages/auth.page';
import DefaultRoutes from './components/routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionData } from './slicers/session.slice';
import { getUserInfo } from './api/profile';
import { message } from 'antd';
import axios from 'axios';

function App() {

  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.session.userData)
  const emailAddress = userSession && userSession.signup ? userSession.signup.emailAddress : '';

  useEffect(() => {
    if (Object(userSession) && token) {

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getUserInfo().then(data => {
        if (data.data.status === 'OK') {
          dispatch(setSessionData(data.data.data[0]))
        }
      }).catch(error => {
        console.error(error);
        messageApi.open({ type: 'error', content: 'Unable to load user data' });
      });
    }
  }, [token, emailAddress])

  return (
    <>
      {contextHolder}
      {
        token ?
          <DefaultRoutes />
          :
          <div className="App">
            <Auth />
          </div>
      }
    </>
  );
}

export default App;
