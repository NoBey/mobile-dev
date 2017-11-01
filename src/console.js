const React = require('react')
import styles from './console.css'


class Console extends React.Component {
  constructor(props) {
    super(props)
    console.log('===> log')
    this.state = {
      dos: ''
    }
  }


  render() {
    const { dos } = this.state

    return (
      <div className={styles.wrap}>
      {
        [
          this.props.title,
          <div className={styles.logwrap}>
          { this.props.logList.log.map( (a,i)=><div className={styles.log} key={a}>{i+'. '+a}</div>) }
          </div>
        ]
      }
      <div className={styles.input}>
      <input value={dos} onChange={e=>this.setState({dos: e.target.value})}  className={styles.text}  type="text" name="firstname"/>
      <input className={styles.bt} onClick={()=>eval(dos) } type="button" value="执行"/ >

      </div>

      </div>
    );
  }
}

Console.defaultProps = {
  // show  : true,
}

module.exports = Console
