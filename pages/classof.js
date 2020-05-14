import Layout from './components/Layout.js'
import fetch from 'isomorphic-unfetch'
import ClassUsers from './class-users'

const ClassOf = props => (
  <ClassUsers year={props.year}/>
)

ClassOf.getInitialProps = async function(context) {
  const { year } = context.query
  return { year }
}

export default ClassOf