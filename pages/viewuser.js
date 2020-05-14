import Layout from './components/Layout.js'
import fetch from 'isomorphic-unfetch'
import ViewUserPage from './view-userpage'

const ViewUsers = props => (
  <ViewUserPage name={props.name}/>
)

ViewUsers.getInitialProps = async function(context) {
  const { name } = context.query
  return { name }
}

export default ViewUsers