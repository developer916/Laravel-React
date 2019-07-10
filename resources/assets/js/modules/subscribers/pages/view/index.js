import { connect } from 'react-redux'
import Subscriber from '../../Subscriber'

// import components
import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const subscriber = state.subscribers.data.find(subscriber => subscriber.id === Number(params.id))
  return {
    subscriber: subscriber ? new Subscriber(subscriber) : new Subscriber({})
  }
}

export default connect(mapStateToProps)(Page)
