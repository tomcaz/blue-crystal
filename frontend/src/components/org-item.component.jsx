import { FormOutlined, TeamOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Row } from "antd"
import { useNavigate } from "react-router-dom"
import { isEmptyObject } from "../utils/constants"

const OrganizationItem = ({ org: { name, id, year, rank } }) => {
    console.log(name)
    const navigate = useNavigate();
    return (
        <div style={styles.main}>
            <Avatar shape="square" size={64} icon={<TeamOutlined />} />
            <Row>
                <Col style={{ fontWeight: 'bold', fontSize: 20, }}>
                    {name}
                </Col>
            </Row>
            <Row>
                <Col>
                    Found in : {year}
                </Col>
            </Row>
            <Row>
                <Col>
                    Volunteers : {isEmptyObject(rank) ? 0 : Object.keys(rank).length}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="primary" onClick={() => navigate(`/editOrg/${id}`)}> Check</Button>
                    <Button type="text" warn onClick={() => navigate(`/editOrg/${id}`)}>{<FormOutlined />}</Button>
                    {/* <Button type="text" danger>{<DeleteOutlined />}</Button> */}
                </Col>
            </Row>
        </div>
    )
}
const styles = {
    main: {
        width: '250px',
        // height: '200px',
        border: '4px solid #DDD',
        borderRadius: '5px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '270px'
    }
}
export default OrganizationItem