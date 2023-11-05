import { useState } from "react";
import { TYPE_ORGANIZATION, TYPE_PARENT, TYPE_VOLUNTEER } from "../../utils/constants";
import { Form, Input, Button, Spin, Row, Col, message, Radio } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signup } from "../../api/login";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState(0)
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSignUp = async () => {
        if (!isLoading) {
            try {
                form.resetFields();
                const result = await signup(username, password, type)
                if (result.data.status === "OK") {
                    messageApi.open({
                        type: 'error',
                        content: `Sent email verification link to ${username}.`
                    })
                    form.resetFields();
                    setType(0)
                    setUsername('')
                    setPassword('')
                } else
                    messageApi.open({
                        type: 'error',
                        content: result.data.message
                    })
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: error
                });
            }
            setIsLoading(false)
        } else {
            messageApi.open({
                type: 'error',
                content: 'Must input valid username and password'
            })
        }
        // if (isLoading)
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
                onFinish={handleSignUp}
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
                <Radio.Group onChange={e => setType(e.target.value)} value={type}>
                    <Radio value={TYPE_PARENT}>Parent</Radio>
                    <Radio value={TYPE_VOLUNTEER}>Volunteer</Radio>
                    <Radio value={TYPE_ORGANIZATION}>Organization</Radio>
                </Radio.Group>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default SignUp