const React = require('react')
import styles from './navigation.css'
import Console from './console.js'

const Title = props => <div className={styles.title}>
  <div className={styles.name} >name</div>
  <div className={styles.close} onClick={props.close} > X </div>
</div>

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'console'
    }
  }

  render() {
    const { close, logList } = this.props
    const { title } = this.state
    return (
      <div className={styles.wrap}>
        <Title close={close} />
        <div className={styles.ul}>
          <div className={styles.li} onClick={()=>this.setState({title: 'console'})} > console </div>
          <div className={styles.li}></div>
          <div className={styles.li}></div>
          <div className={styles.li}></div>
        </div>

        {
          title === 'console' ? <Console logList={logList} title={<Title close={() => this.setState({title:''}) } />} /> : []
        }


      </div>
    );
  }
}

module.exports = Navigation
