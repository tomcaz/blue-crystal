import config from '../config'
const PageTitle = () => (<div style={styles.title}>{config.app.title}</div>)

const styles = {
    title: {
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '30px',
        color: config.theme.colors.titleColor
    }
}

export default PageTitle;