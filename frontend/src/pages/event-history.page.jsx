// import config from '../../config'

import { useSelector } from "react-redux";
import { useAuth } from "../providers/auth.provider"
import { Col, Empty, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";

const EventHistory = () => {
    const { logoutFromServer } = useAuth();
    const navigate = useNavigate()
    const userSession = useSelector((state) => state.session.userData)
    console.log(userSession)
    const onSearch = () => {
        logoutFromServer()
    }
    if (!userSession || userSession === null || !userSession.signup)
        return (<>Loading...</>)
    return (
        <>
            <Row style={styles.main}>
                <Col span={8} offset={8}>
                    <h1 style={{textAlign: 'center'}}>Event History</h1>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    /></Col>
            </Row>
            <Row style={{
                padding: 40,
                flexDirection: 'column'
            }}>
                <Col>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={

                            <><span>
                                No record found.
                            </span>
                                <h1>TBA</h1></>
                        }
                    >
                    </Empty>
                </Col>
            </Row>
        </ >
    )
}

const styles = {
    main: {
        flexDirection: 'column',
        marginTop: 200,
        textAlign: 'left',
        padding: 40


    }, boxStyle: {
        backgroundColor: '#DDD',
        width: '100%',
        height: 200,
    }
}

export default EventHistory