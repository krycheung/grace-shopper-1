import {expect} from 'chai'
import {fetchSpoons} from './allSpoonsReducer'
import {getSingleSpoonThunk} from './singleSpoonReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import singleSpoonReducer from './singleSpoonReducer'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Spoon Thunk Creators', () => {
  let store
  let mockAxios

  const initialState = {spoons: [], singleSpoon: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSpoons', () => {
    it('dispactches the SET_SPOONS action', async () => {
      const fakeAllSpoons = [
        {id: 1, material: 'wood'},
        {id: 2, material: 'plastic'},
        {id: 1, material: 'wood'}
      ]
      mockAxios.onGet('/api/spoons').replyOnce(200, fakeAllSpoons)
      await store.dispatch(fetchSpoons())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_SPOONS')
      expect(actions[0].spoons).to.be.deep.equal(fakeAllSpoons)
    })
  })

  describe('getSingleSpoonThunk', () => {
    it('dispactches the SET_SPOON action', async () => {
      const fakeSpoon = {id: 3, material: 'plastic'}
      mockAxios.onGet('api/spoons/3').replyOnce(200, fakeSpoon)
      await store.dispatch(getSingleSpoonThunk(3))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_SPOON')
      expect(actions[0].spoon).to.be.deep.equal(fakeSpoon)
    })
  })
})
