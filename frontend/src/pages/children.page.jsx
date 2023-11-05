// import config from '../../config'

import { useSelector } from "react-redux";
import { Col, Flex, Row, message } from "antd";
import { useEffect, useState } from "react";
import { deleteChild, getChildrenList } from "../api/profile";
import ChildItem from "../components/child-item.component";
import EmptyItemJustAdd from "../components/empty-item-just-add.component";
import { UserOutlined } from "@ant-design/icons";

const Children = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [children, setChildren] = useState([])
    const [id, setId] = useState();
    const [toggleReload, setToggleReload] = useState([]);
    const userSession = useSelector((state) => state.session.userData)

    const handleDelete = (id) => {
        setToggleReload(!toggleReload)
        deleteChild(id)
    }

    useEffect(() => {

        setId(userSession.id)

        getChildrenList(userSession.id).then(data => {
            if (data.data.status === 'OK') {
                setChildren(data.data.data)
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Oops !!! Unable to list the children list.'
                })
            }
        }
        ).catch(error =>
            messageApi.open({
                type: 'error',
                content: 'Oops !!! It`s on us, Please try again later'
            })
        )
    }, [toggleReload])

    return (
        <>
            {contextHolder}
            <Row style={styles.main}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>List of Children</h1>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col>
                    <Flex wrap="wrap" gap="small">
                        {children.map(child => (<ChildItem key={child.id} child={child} handleDelete={handleDelete} />))}
                        < EmptyItemJustAdd label='Add your love one' next='/addChild' logo={<UserOutlined />} />
                    </Flex></Col>
            </Row>
            <br />

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

export default Children