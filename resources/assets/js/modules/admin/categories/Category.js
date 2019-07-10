import Model from '../../../utils/Model'

class Category extends Model {
    constructor(props) {
        super(props)

        this.initialize(props)
    }

    initialize(props) {
        super.initialize(props)

        this.name = props.name || ''
    }
}

export default Category