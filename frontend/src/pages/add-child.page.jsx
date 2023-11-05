// import config from '../../config'

import { useSelector } from "react-redux";
import { Button, Col, Form, Input, InputNumber, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChildInfo, saveChild, updateChild } from "../api/profile";

const AddChild = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [childname, setChildname] = useState('');
    const [age, setAge] = useState(3);
    const [characters, setCharacters] = useState('');
    const [allergy, setAllergy] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const [loading, setLoading] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const userSession = useSelector((state) => state.session.userData)

    const handleSubmit = async () => {
        setLoading(true)
        const data = {
            childname, age, characters: characters ? characters.split(',') : [],
            allergy: allergy ? allergy.split(',') : [], additionalInfo
        };
        try {
            let result = (id && id !== null) ? await updateChild(id, data)
                : await saveChild(userSession.id, data);
            if (result.data.status === 'OK') {
                messageApi.open({
                    type: 'success',
                    content: 'Saved child information successfully.'
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: result.data.message
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Oops !!! It`s on us, Please try again later'
            });
        }
        setLoading(false)
    }

    useEffect(() => {
        try {
            if (params && params.id) {
                setLoading(true)
                getChildInfo(params.id).then(data => {
                    const { childname, age, characters, allergy, additionalInfo } = data.data.data;
                    setChildname(childname)
                    setAge(age)
                    setCharacters(characters.join(','))
                    setAllergy(allergy.join(','))
                    setAdditionalInfo(additionalInfo)
                    form.setFieldsValue({ childname, age, characters: characters.join(','), allergy: allergy.join(','), additionalInfo })
                    setLoading(false)
                }).catch(error => messageApi.open({ type: 'error', content: 'Unable to load children information' }));
                setId(params.id)
            }
        } catch (error) {

        }

    }, [])


    return (
        <>
            {contextHolder}
            <Row style={styles.main}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>{id ? "Update Child Information" : "Add a child"}</h1>
                </Col>
            </Row>

            <Row>
                <Col span={10} offset={6}>
                    <Form name="basic" form={form}
                        labelCol={{ span: 10, }}
                        wrapperCol={{ span: 14, }}
                        style={{ maxWidth: 600 }}
                        initialValues={{
                            age,
                        }}
                        onFinish={handleSubmit}
                        onFinishFailed={() => messageApi.open({
                            type: 'error',
                            content: 'Please fix highlighted inputs in red.'
                        })}
                        autoComplete="off"
                    >
                        <Form.Item label="Name of the Child" name="childname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your child\'s name!',
                                },
                            ]}
                        >
                            <Input onChange={e => setChildname(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="age" name="age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input his/her age!',
                                },
                            ]}
                        >
                            <InputNumber addonAfter="age" min={3} max={80} onChange={e => setAge(e)} />
                        </Form.Item>

                        <Form.Item label="Characters" name="characters">
                            <Input onChange={e => setCharacters(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Allergy" name="allergy">
                            <Input onChange={e => setAllergy(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Additional Information" name="additionalInfo"
                        >
                            <TextArea onChange={e => setAdditionalInfo(e.target.value)} />
                        </Form.Item>


                        <Form.Item wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        >
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {id ? "Update" : "Save"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row >

        </ >
    )
}

const styles = {
    main: {
        marginTop: 200,
        flexDirection: 'column',
        textAlign: 'left'
    }, title: {

    }
}

export default AddChild