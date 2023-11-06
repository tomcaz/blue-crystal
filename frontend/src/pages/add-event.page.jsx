// import config from '../../config'

import { useSelector } from "react-redux";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Slider, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddEvent = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [location, setLocation] = useState()
    const [Organizations, setOrganizations] = useState()
    const [eventType, setEventType] = useState()
    const [age, setAge] = useState([3, 20])
    const [participants, setParticipants] = useState(1)
    const [description, setDescription] = useState()

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const userSession = useSelector((state) => state.session.userData)

    const handleSubmit = async () => {
        setLoading(true)
        // const data = {
        //     childname, age, characters: characters ? characters.split(',') : [],
        //     allergy: allergy ? allergy.split(',') : [], additionalInfo
        // };
        // try {
        //     let result = (id && id !== null) ? await updateChild(id, data)
        //         : await saveChild(userSession.id, data);
        //     if (result.data.status === 'OK') {
        //         messageApi.open({
        //             type: 'success',
        //             content: 'Saved child information successfully.'
        //         });
        //     } else {
        //         messageApi.open({
        //             type: 'error',
        //             content: result.data.message
        //         });
        //     }
        // } catch (error) {
        //     messageApi.open({
        //         type: 'error',
        //         content: 'Oops !!! It`s on us, Please try again later'
        //     });
        // }
        setLoading(false)
    }

    useEffect(() => {
        try {
            if (params && params.id) {
                setLoading(true)
                setId(params.id)
                setLoading(false);
            }
        } catch (error) {
            setLoading(false)

        }

    }, [])

    return (
        <>
            {contextHolder}
            <Row style={styles.main}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>{id ? "Update event Information" : "Add an event"}</h1>
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
                        <Form.Item label="Name" name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the event name!',
                                },
                            ]}
                        >
                            <Input onChange={e => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Date">
                            <DatePicker onChange={setDate} />
                        </Form.Item>
                        <Form.Item label="Time">
                            <TimePicker onChange={(time) => console.log(date)} format={'HH:mm'} />
                        </Form.Item>

                        <Form.Item label="Location" name="location"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the event Location!',
                                },
                            ]}
                        >
                            <Input onChange={e => setLocation(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Organization">
                            <Select
                                defaultValue="lucy"
                                style={{ width: 120 }}
                                onChange={setOrganizations}
                                options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe', label: 'yiminghe' },
                                    { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Event Type" name="eventType"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the event type!',
                                },
                            ]}
                        >
                            <Input onChange={e => setEventType(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Age Group">
                            {age ? age.join('-') : ''}
                            <Slider range defaultValue={age} min={2} max={80} onChange={setAge} />
                        </Form.Item>

                        <Form.Item label="No. of Participants" name="participants"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the number of participants!',
                                },
                            ]}
                        >
                            <Input onChange={e => setParticipants(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Description" name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the description!',
                                },
                            ]}
                        >
                            <Input onChange={e => setDescription(e.target.value)} />
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

export default AddEvent