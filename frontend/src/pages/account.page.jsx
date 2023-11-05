// import config from '../../config'

import { useSelector } from "react-redux";
import { Button, Col, Row, message, Form, Input, Divider } from "antd";
import { useEffect, useMemo, useState } from "react";
import { resetPassword, updateAccount } from "../api/profile";
import { TYPE_ORGANIZATION, isEmptyString, isUserRole } from "../utils/constants";
import { getOrgsByVolunteer } from "../api/volunteer";
import { DeleteOutlined } from "@ant-design/icons";

const Account = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const userSession = useSelector((state) => state.session.userData)
    const [form] = Form.useForm();
    const [volunteeringForm] = Form.useForm();
    const [loading, setLoading] = useState(false)

    // console.log(userSession)
    const [fullName, setFullName] = useState()
    const [emailAddress, setEmailAddress] = useState();
    const [role, setRole] = useState();
    const [volunteers, setVolunteers] = useState([])

    const changePassword = async () => {
        await resetPassword(emailAddress);
        messageApi.open({ type: "success", content: `Sent password reset link to ${emailAddress}.` })
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const result = await updateAccount(userSession.id, { fullName });
            console.log(result)
            if (result.data.status === 'OK')
                messageApi.open({
                    type: 'success', content: 'Account information has been updated.'
                })
            else
                messageApi.open({
                    type: 'error', content: 'Oops!!! Can\'t save the information.'
                })
            setLoading(false)
        } catch (error) {
            messageApi.open({
                type: 'error', content: 'Unable to save account information.'
            })
            setLoading(false)
            console.error(error)
        }
    }

    const removeVoluneer = (id) => {
        setVolunteers([...volunteers.filter(vol => vol.id !== id)])
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

    useEffect(() => {
        if (userSession && userSession.signup) {
            const { id } = userSession;
            getOrgsByVolunteer(id).then(data => {
                setVolunteers(data.data.data)
            }).catch(error => {
                console.error(error);
                messageApi.open({
                    type: 'error', content: 'Unable to load volunteer information.'
                })
            })
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
            {!isUserRole(role, TYPE_ORGANIZATION) &&
                <>
                    <Divider />
                    <Row style={{
                        ...styles.main
                    }}>
                        <Col>
                            <h1 style={{ textAlign: 'center' }} onClick={() => messageApi.open({ type: 'success', content: 'Hello world' })}>Volunteer Information</h1>
                        </Col>
                    </Row >
                    <Row>
                        <Col offset={10} span={4}>Organization Name</Col>
                        <Col span={2}>Rank</Col>
                    </Row>
                    <Row>
                        <Col offset={10} span={5}><Divider /></Col>
                    </Row>
                    {(volunteers instanceof Array) && volunteers.map(vol => (
                        <>
                            <Row key={vol.id}>
                                <Col offset={10} span={4}>{vol.name}</Col>
                                <Col span={2}>{vol.rank}</Col>
                            </Row>
                            <Row>
                                <Col offset={10} span={5}><Divider /></Col>
                            </Row>
                        </>
                    ))}
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

export default Account