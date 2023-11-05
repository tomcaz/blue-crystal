import { Col, Row } from 'antd'
import Login from '../components/login/login.component'
import SignUp from '../components/login/signup.component'
import PageTitle from '../components/page-title.component'
import config from '../config'

import Logo from '../resources/parents.svg'
import { useState } from 'react'

const Auth = () => {

    const [toggle, setToggle] = useState(true)

    const toggleAccountType = () => {
        setToggle(!toggle)
    }
    return (
        <div style={styles.main}>
            <Row>
                <Col style={styles.logo} span={6}></Col>
                <Col style={styles.logo} span={6}><img src={Logo} alt="site logo" /></Col>
                <Col style={styles.box} span={6}>
                    <PageTitle />
                    {toggle ? <Login /> : <SignUp />}
                    <br />
                    <br />
                    <a href="#" onClick={toggleAccountType}>{toggle ? "Don't have an account with us.?" : "Would you like to login?"}</a>
                </Col>
                {/* <Col></Col> */}
            </Row>
        </div>
    )
}

const styles = {
    main: {
        backgroundColor: config.theme.colors.backgroundColor,
        marginTop: '100px',
        borderRadius: 15,
    }, box: {
        paddingTop: '50px',
        paddingBottom: '50px',
        alignItems: 'stretch'
    }, verticalLine: {
        width: '1px',
        float: 'left'
    }
}

export default Auth