import React    from 'react'
import ReactDOM from 'react-dom'
import MDev     from '../../lib/index.js'
class App extends React.Component {
    render() {
        return (
          <MDev style={{color: 'red'}}>
            App
          </MDev>
        );
    }
}
ReactDOM.render(
    <App/>, document.getElementById('app'));
