import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as codeActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

function getCodeData() {

}