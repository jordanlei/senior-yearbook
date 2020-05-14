import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';

const divStyle = {
  paddingLeft: 10+'%',
  paddingRight: 10+ '%'
}

const Layout = props => (
  <div>
    <div style={divStyle}>
        {props.children}
    </div>
  </div>
)

export default Layout