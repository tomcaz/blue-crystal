// import config from '../../config'

import { useSelector } from "react-redux";
import { Col, Flex, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getOrgList } from "../api/orgs";
import EmptyItemJustAdd from "../components/empty-item-just-add.component";
import { TeamOutlined } from "@ant-design/icons";
import OrganizationItem from "../components/org-item.component";

const Organizations = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [orgs, setOrgs] = useState([])
    const [id, setId] = useState();
    const userSession = useSelector((state) => state.session.userData)

    useEffect(() => {
        setId(userSession.id)

        getOrgList(userSession.id).then(data => {
            if (data.data.status === 'OK') {
                console.log(data.data.data)
                setOrgs(data.data.data)
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Oops !!! Unable to list the organization list.'
                })
            }
        }
        ).catch(error =>
            messageApi.open({
                type: 'error',
                content: 'Oops !!! It`s on us, Please try again later'
            })
        )
    }, [])

    return (
        <>
            {contextHolder}
            <Row style={styles.main}>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>List of Organizations</h1>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col>
                    <Flex wrap="wrap" gap="small">
                        {orgs.map(org => (<OrganizationItem key={org.id} org={org} />))}
                        <EmptyItemJustAdd label="Create an Organization" next="/addOrg" logo={<TeamOutlined />} />
                    </Flex>
                </Col>
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

export default Organizations