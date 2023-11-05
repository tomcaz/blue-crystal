// import config from '../../config'

import { useSelector } from "react-redux";
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrg, saveOrg, updateOrg } from "../api/orgs";
import { getVolunteerList } from "../api/volunteer";
import { DeleteOutlined } from "@ant-design/icons";
import { isEmptyObject } from "../utils/constants";

const AddOrganization = () => {
    const params = useParams();
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [rank, setRank] = useState({});
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState(2023);
    const [volunteers, setVolunteers] = useState([]);
    const [availableVolunteers, setAvailableVolunteers] = useState([]);
    const [selectedVol, setSelectedVol] = useState('Select First')

    const [loading, setLoading] = useState(false)
    const [loadingVolunteer, setLoadingVolunteer] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const userSession = useSelector((state) => state.session.userData)

    const saveVolunteer = async () => {
        setLoadingVolunteer(true)
        const data = { rank: Object.fromEntries(volunteers.map((vol) => [vol.id, vol.rank])) }
        try {
            const result = await updateOrg(id, data)
            if (result.data.status === 'OK') {
                setId(result.data.data)
                messageApi.open({
                    type: 'success',
                    content: 'Saved Volunteer List successfully.'
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Oops!!! Unable to save.'
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Oops !!! It`s on us, Please try again later'
            });
        }
        setLoadingVolunteer(false)
    }

    const removeVoluneer = (id) => {
        setVolunteers([...volunteers.filter(v => v.id !== id)]);
    }


    const changeVolunteerRank = (id, rank) => {
        console.log(id, rank)
        const volunteer = {
            ...volunteers.filter(v => v.id === id)[0],
            rank
        }
        setVolunteers([
            ...volunteers.filter(v => v.id !== id),
            volunteer
        ])
    }

    const addVolunteer = () => {
        const data = availableVolunteers.filter(av => selectedVol);
        if (data && data.length > 0) {
            const vol = data[0];
            if (volunteers.filter(v => v.id === vol.value).length === 0)
                setVolunteers([...volunteers, {
                    id: vol.value,
                    fullName: vol.label,
                    rank: 'junior'
                }])
        }
    }

    const handleSelectVolunteer = (volunteer) => {
        setSelectedVol(volunteer)
    }

    const handleSubmit = async () => {
        setLoading(true)
        const data = {
            year, name, desc, owner: userSession.id
        };
        try {
            let result = (id && id !== null) ? await updateOrg(id, data)
                : await saveOrg(data);
            if (result.data.status === 'OK') {
                setId(result.data.data)
                messageApi.open({
                    type: 'success',
                    content: 'Saved organization information successfully.'
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
        // load org info
        try {
            if (params && params.id) {
                setLoading(true)
                getOrg(params.id).then(data => {
                    const { year, name, desc, rank } = data.data;
                    setName(name)
                    setYear(year)
                    setDesc(desc)
                    setRank(rank)
                    form.setFieldsValue({ name, year, desc })
                    setLoading(false)
                }).catch(error => { console.error(error); messageApi.open({ type: 'error', content: 'Unable to load organization information' }) });
                setId(params.id)
            }
        } catch (error) {

        }
    }, []);

    useEffect(() => {
        // load list of volunteer
        try {
            if (params && params.id) {
                setLoading(true)
                getVolunteerList(params.id).then(data => {

                    setAvailableVolunteers(data.data.data.map(vol => ({ value: vol.id, label: vol.fullName })))
                    setLoading(false)
                }).catch(error => { console.error(error); messageApi.open({ type: 'error', content: 'Unable to load organization information' }) });
                setId(params.id)
            }
        } catch (error) {

        }

    }, [])

    useEffect(() => {
        // match after org info and available volunteer have laoded
        if (!isEmptyObject(rank) && availableVolunteers.length > 0) {
            setVolunteers(Object.keys(rank).map(key => {
                const vol = availableVolunteers.filter(v => v.value === key);
                let fullName = null;
                if (vol.length > 0)
                    fullName = vol[0].label;
                return ({
                    id: key,
                    rank: rank[key],
                    fullName
                })
            }))
            // console.log([...rank])
            //     .map(([key, value]) =>
            // ({
            //     key, value
            // })
            // ));
        }
    }, [rank, availableVolunteers]);


    return (
        <>
            {contextHolder}
            <Row style={{ ...styles.main, marginTop: 200 }}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>{id ? "Update Organization Information" : "Create an Organization"}</h1>
                </Col>
            </Row>

            <Row>
                <Col span={14} offset={6}>
                    <Form name="basic" form={form}
                        labelCol={{ span: 10, }}
                        wrapperCol={{ span: 14, }}
                        style={{ maxWidth: 600 }}
                        initialValues={{
                            year,
                        }}
                        onFinish={handleSubmit}
                        onFinishFailed={() => messageApi.open({
                            type: 'error',
                            content: 'Please fix highlighted inputs in red.'
                        })}
                        autoComplete="off"
                    >
                        <Form.Item label="Name of the Organization" name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your organization\'s name!',
                                },
                            ]}
                        >
                            <Input onChange={e => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Year of Found" name="year"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input year of found!',
                                },
                            ]}
                        >
                            <InputNumber addonAfter="year" min={1800} max={2200} onChange={e => setYear(e)} />
                        </Form.Item>

                        <Form.Item label="Description" name="desc"
                        >
                            <TextArea onChange={e => setDesc(e.target.value)} />
                        </Form.Item>


                        <Form.Item wrapperCol={{
                            offset: 8,
                            span: 14,
                        }}
                        >
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {id ? "Update" : "Save"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row >
            <Divider />
            <Row style={styles.main}>
                <Col><h1 style={{ textAlign: 'center' }}>Volunteers List</h1></Col>
            </Row>

            <Row>
                <Col offset={10}>
                    <Select
                        defaultValue={selectedVol}
                        style={{ width: 120 }}
                        onChange={handleSelectVolunteer}
                        options={availableVolunteers}
                    />
                </Col>
                <Col style={{ paddingLeft: 20 }}>
                    <Button type="primary" htmlType="submit" onClick={addVolunteer}>
                        Add Volunteer
                    </Button>
                </Col>
            </Row>
            <br />
            <Row>
                <Col offset={10} span={2}>Full Name</Col>
                <Col>Rank</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col offset={10} span={5}><Divider /></Col>
            </Row>
            {volunteers.map(vol => (
                <>
                    <Row key={vol.id}>
                        <Col offset={10} span={2}>{vol.fullName}</Col>
                        <Col><Select
                            defaultValue='junior'
                            style={{ width: 120 }}
                            onChange={(key) => changeVolunteerRank(vol.id, key)}
                            options={[
                                { value: 'junior', label: 'Junior' },
                                { value: 'scout', label: 'Scout' },
                                { value: 'parent', label: 'Parent' },
                                { value: 'hardcore', label: 'Hardcore' },
                            ]}
                        /></Col>
                        <Col>
                            <Button type="Link" onClick={() => removeVoluneer(vol.id)}>
                                <DeleteOutlined />
                            </Button></Col>
                    </Row>
                    <Row>
                        <Col offset={10} span={5}><Divider /></Col>
                    </Row>
                </>
            ))}

            <Row>
                <Col offset={11}>

                    <Button type="primary" htmlType="submit" onClick={saveVolunteer} loading={loadingVolunteer}>
                        Save Volunteers List
                    </Button>
                </Col>
            </Row>
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

export default AddOrganization