import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

const Layout = props => (
  <div className= "layout">
    <Header light={props.light}/>
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout