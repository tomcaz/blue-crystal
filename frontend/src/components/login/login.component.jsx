import { useState } from "react"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, message } from "antd"
import { forgetPassword, login } from "../../api/login";
import { useAuth } from "../../providers/auth.provider";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../api/profile";
import { setSessionData } from "../../slicers/session.slice";
import axios from "axios";

const Login = () => {
    const { setToken } = useAuth()

    const [messageApi, contextHolder] = message.useMessage();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const forgotPassword = async () => {
        if (!username || username === '') {
            messageApi.open({
                type: 'error',
                content: 'Sorry, we need your email address',
            });
        } else {
            await forgetPassword(username)
            messageApi.open({
                type: 'error',
                content: 'Password reset request has been sent. You will receive instruction'
            })
        }
    }
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const result = await login(username, password)
            if (result.data.status === "OK") {
                const token = result.data;
                setToken(token.token.idToken, token.token.refreshToken)
                axios.defaults.headers.common["Authorization"] = "Bearer " + token.token.idToken;

                const data = await getUserInfo();
                if (data.data.status === 'OK') {
                    dispatch(setSessionData(data.data.data[0]))
                }
            } else {
                messageApi.open({
                    type: 'error',
                    content: result.data.message
                });
            }
            setIsLoading(false)

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Oops !!! It`s on us, Please try again later'
            });
            console.error(error)
            setIsLoading(false)
        }

    }

    return (
        <Row>
            {contextHolder}
            <Form
                form={form}
                name="wrap"
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600 }}
                autoComplete="no"
                onFinish={handleLogin}
            >
                <Form.Item label="Username: " name="username" rules={[{ required: true }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username" />
                </Form.Item>

                <Form.Item label="Password: " name="password" rules={[{ required: true }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        onChange={e => setPassword(e.target.value)}
                        type="password" placeholder="Password"
                        value={password} />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Login
                    </Button>
                    <Button type="link" onClick={() => forgotPassword()}>Forgot Password?</Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default Login