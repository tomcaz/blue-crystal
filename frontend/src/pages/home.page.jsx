// import config from '../../config'

import { useSelector } from "react-redux";
import { useAuth } from "../providers/auth.provider"
import { Button, Card, Col, Divider, Flex, Row, Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import { TYPE_PARENT, isUserRole } from "../utils/constants";
import { ArrowUpOutlined } from "@ant-design/icons";

const Home = () => {
    const { logoutFromServer } = useAuth();
    const navigate = useNavigate()
    const userSession = useSelector((state) => state.session.userData)
    console.log(userSession)
    const handleLogout = () => {
        logoutFromServer()
    }
    if (!userSession || userSession === null || !userSession.signup)
        return (<>Loading...</>)
    return (
        <>
            <Row style={{ ...styles.main }}>
                <Col>
                    <p style={{ paddingLeft: 40, textAlign: 'center', fontSize: 40 }}>Welcome {userSession.fullName}</p>
                </Col>
            </Row>
            <br />
            {
                userSession.fullName === '' &&
                <Button type="link" onClick={() => navigate('/account')}>Can't see your name? Please amend in here</Button>
            }

            {isUserRole(userSession.role, TYPE_PARENT) &&
                <>
                    <Divider />

                    <Flex style={styles.boxStyle} justify={'space-evenly'} align={'center'}>
                        <Card bordered={false}>
                            <Statistic
                                title="Type"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic
                                title="Joined Org"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic
                                title="Activities"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic
                                title="Children"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic
                                title="Awards"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic
                                title="Reviews"
                                value="TBA"
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            // suffix="%"
                            />
                        </Card>
                    </Flex>
                </>
            }
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
            <br />
            <br />
        </ >
    )
}

const styles = {
    main: {
        marginTop: 200,
        flexDirection: 'column',
        textAlign: 'left',
        paddingLeft: 40

    }, boxStyle: {
        backgroundColor: '#DDD',
        width: '100%',
        height: 200,
    }
}

export default Home