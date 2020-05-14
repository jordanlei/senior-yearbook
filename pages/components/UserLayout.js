import UserHeader from './UserHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

const UserLayout = props => (
  <div className= "layout">
    <UserHeader />
    <div>
      {props.children}
    </div>
  </div>
)

export default UserLayout