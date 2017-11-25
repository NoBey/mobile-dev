const React = require('react')
import MDevWrap from './wrap.js'
import Navigation from './navigation.js'
import './main.css';
window.oldLog  = window.console

class MDev extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show : false,
      logList: {
        log:[],
        info:[],
        warn:[]
      }
    }
    const { logList } = this.state
    window.console = {
      log: l => {
        logList.log.push(l)
        this.setState({logList})
        return oldLog.log(l)
      },
      error:(l)=>oldLog.error(l)
    }
  }

  render() {
    const { show, logList } = this.state
    return (
      <div {...this.props}>
        {
          show ?  <Navigation logList={logList} close={()=> this.setState({show: false}) } /> : <MDevWrap show={()=>this.setState({show: true}) } />
        }
        { this.props.children }
      </div>
    );
  }
}

MDev.defaultProps = {
  // show  : true,
}


module.exports = MDev
