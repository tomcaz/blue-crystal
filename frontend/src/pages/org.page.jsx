// import config from '../../config'

import { useSelector } from "react-redux";
import { Button, Col, Row, message, Form, Input, Divider } from "antd";
import { useEffect, useMemo, useState } from "react";
import { resetPassword } from "../api/profile";
import { TYPE_ORGANIZATION, isEmptyString } from "../utils/constants";

const Organization = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const userSession = useSelector((state) => state.session.userData)
    const [form] = Form.useForm();
    const [volunteeringForm] = Form.useForm();
    const [loading, setLoading] = useState(false)

    // console.log(userSession)
    const [fullName, setFullName] = useState()
    const [emailAddress, setEmailAddress] = useState();
    const [role, setRole] = useState();

    const changePassword = async () => {
        await resetPassword(emailAddress);
        messageApi.open({ type: "success", content: `Sent password reset link to ${emailAddress}.` })
    }
    const handleSubmit = () => {

    }

    useEffect(() => {
        if (userSession && userSession.signup) {
            const { role, signup } = userSession;
            const { emailAddress, displayname } = signup;
            setFullName(displayname)
            setEmailAddress(emailAddress)
            setRole(role);
            form.setFieldsValue({ emailAddress, fullName: displayname })
        }

    }, [])


    return (
        <>
            {contextHolder}
            <Row style={{
                ...styles.main,
                marginTop: 200,
            }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }} onClick={() => messageApi.open({ type: 'success', content: 'Hello world' })}>Account Information</h1>
                </Col>
            </Row >
            <br />
            <Row>
                <Col span={10} offset={6}>
                    <Form name="basic" form={form}
                        labelCol={{ span: 10, }}
                        wrapperCol={{ span: 14, }}
                        style={{ maxWidth: 600 }}
                        initialValues={{
                        }}
                        onFinish={handleSubmit}
                        onFinishFailed={() => messageApi.open({
                            type: 'error',
                            content: 'Please fix highlighted inputs in red.'
                        })}
                        autoComplete="off"
                    >
                        <Form.Item label="Email Address: " name="emailAddress">
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item label="Full Name: " name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input onChange={e => setFullName(e.target.value)} />
                        </Form.Item>

                        <Form.Item wrapperCol={{
                            offset: 6,
                            span: 18,
                        }}
                        >
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Update
                            </Button>
                            <Button type="link" htmlType="button" onClick={changePassword}>
                                Generate Change Password Link
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Divider />
            {role !== TYPE_ORGANIZATION &&
                <>
                    <Row style={styles.main}>
                        <Col>
                            <h1 style={{ textAlign: 'center' }} onClick={() => messageApi.open({ type: 'success', content: 'Hello world' })}>
                                Volunteering Information</h1>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={10} offset={6}>
                            <Form name="basic" form={volunteeringForm}
                                labelCol={{ span: 10, }}
                                wrapperCol={{ span: 14, }}
                                style={{ maxWidth: 600 }}
                                initialValues={{
                                }}
                                onFinish={handleSubmit}
                                onFinishFailed={() => messageApi.open({
                                    type: 'error',
                                    content: 'Please fix highlighted inputs in red.'
                                })}
                                autoComplete="off"
                            >
                                <Form.Item label="Email Address: " name="emailAddress">
                                    <Input disabled={true} />
                                </Form.Item>

                                <Form.Item label="Full Name: " name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your full name!',
                                        },
                                    ]}
                                >
                                    <Input onChange={e => setFullName(e.target.value)} />
                                </Form.Item>

                                <Form.Item wrapperCol={{
                                    offset: 6,
                                    span: 18,
                                }}
                                >
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </>
            }
            <br />
        </ >
    )
}

const styles = {
    main: {
        flexDirection: 'column',
        textAlign: 'left'
    }, title: {

    }
}

export default Organization