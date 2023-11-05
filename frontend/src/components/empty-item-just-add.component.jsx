import { PlusOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Row } from "antd"
import { useNavigate } from "react-router-dom"

const EmptyItemJustAdd = ({ label, next, logo }) => {
    const navigator = useNavigate();
    return (
        <div style={styles.main}>
            <Avatar shape="square" size={64} icon={logo} />
            <Button type="primary" onClick={() => navigator(next)}> <PlusOutlined />{label}</Button>
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
export default EmptyItemJustAdd