import { DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Flex, Popconfirm, Row } from "antd"
import { useNavigate } from "react-router-dom"

const ChildItem = ({ child: { age, childname, allergy, characters, id }, handleDelete }) => {
    const navigate = useNavigate()
    return (
        <Row style={styles.main}>
            <Col>
                <Row>
                    <Col>
                        <Avatar shape="square" size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col>
                        <p style={styles.name}>{childname}</p>
                        <p style={styles.age}>Age: {age}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={styles.p}>Allergy: </p>
                        <p style={styles.p}>{allergy.join(',')}</p>
                        <p style={styles.p}>Characters: </p>
                        <p style={styles.p}>{characters.join(',')}</p>
                    </Col>
                </Row>
                <Flex justify="space-around">
                    <Button type="primary">Check</Button>
                    <Button type="text" warn onClick={() => navigate(`/editChild/${id}`)}>{<FormOutlined />}</Button>
                    <Popconfirm
                        title="Delete Child Record"
                        description="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger>{<DeleteOutlined />}</Button>
                    </Popconfirm>
                </Flex>
            </Col>
        </Row>
    )
}
const styles = {
    main: {
        width: '250px',
        // height: '200px',
        border: '4px solid #DDD',
        borderRadius: '5px',
        padding: '20px'
    }, name: {
        paddingLeft: 20,
        fontWeight: 'bold'

    }, age: {
        paddingLeft: 20,
    }, p: {
        lineHeight: '10px',
        height: '10px',
    }
}
export default ChildItem