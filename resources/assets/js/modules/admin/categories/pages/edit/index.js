import { connect } from 'react-redux'
import Category from '../../Category';

import Page from './Page'


const mapStateToProps = (state, router) => {
    const { params } = router.match

    console.log("params_id", Number(params.id))
    console.log("state_superCategory", state.superCategories);
    const category = state.superCategories.data.find(category => category.id === Number(params.id))
    console.log("category", category);
    return {
        category: category ? new Category(category) : new Category({})
    }
}

export default connect(mapStateToProps)(Page)

// export default connect()(Page)