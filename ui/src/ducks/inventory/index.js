import axios from 'axios'
import { createAction, handleActions } from 'redux-actions'
import { openSuccess } from '../alerts'

const actions = {
  INVENTORY_GET_ALL: 'inventory/get_all',
  INVENTORY_GET_ALL_PENDING: 'inventory/get_all_pending',
  INVENTORY_CREATE: 'inventory/create',
  INVENTORY_UPDATE: 'inventory/update',
  INVENTORY_DELETE: 'inventory/delete',
  INVENTORY_REFRESH: 'inventory/refresh'
}

export let defaultState = {
  all: [],
  fetched: false,
}

export const findInventory = createAction(actions.INVENTORY_GET_ALL, () =>
  (dispatch, getState, config) => axios
    .get(`${config.restAPIUrl}/inventory`)
    .then((suc) => {
      dispatch(refreshInventory(suc.data))
      openSuccess("Inventory Found")
  })
)
export const createInventory = createAction(actions.INVENTORY_CREATE, (inventory) => 
  (dispatch, getState, config) => axios
    .post(`${config.restAPIUrl}/inventory`, inventory)
    .then((suc) => {
      const invs = []
      //adds all the inventory not matching the created one to the array
      getState().inventory.all.forEach(inv => {
        if (inv.id !== suc.data.id) {
          invs.push(inv)
        }
      })
      //adds created inventory to the array
      invs.push(suc.data)
      //refresh with contents of the array
      dispatch(refreshInventory(invs))
      openSuccess("Inventory Created")
    })
)
export const deleteInventory = createAction(actions.INVENTORY_DELETE, (id) => 
  (dispatch, getState, config) => axios
    .delete(`${config.restAPIUrl}/inventory`, {data: id})
    .then((suc) => {
      const invs = []
      getState().inventory.all.forEach(inv => {
        //pushes all the inventories that don't include the deleted id
        if (!id.includes(inv.id)) {
          invs.push(inv)
        }
      })
      dispatch(refreshInventory(invs))
      openSuccess("Inventory Deleted")
    })
    
)
export const updateInventory = createAction(actions.INVENTORY_UPDATE, (id, inventory) => 
  (dispatch, getState, config) => axios
    .put(`${config.restAPIUrl}/inventory/${id}`,inventory)
    .then((suc) => {
      const invs = []
      getState().inventories.all.forEach(inv => {
        if (inv.id !== suc.data.id) {
          invs.push(inv)
        }
      })
      invs.push(suc.data)
      dispatch(refreshInventory(invs))
      openSuccess("Inventory Updated")
    })
)
export const refreshInventory = createAction(actions.INVENTORY_REFRESH, (payload) =>
  (dispatcher, getState, config) =>
    payload.sort((inventoryA, inventoryB) => inventoryA.name < inventoryB.name ? -1 : inventoryA.name > inventoryB.name ? 1 : 0)
)

export default handleActions({
  [actions.INVENTORY_GET_ALL_PENDING]: (state) => ({
    ...state,
    fetched: false
  }),  
  [actions.INVENTORY_REFRESH]: (state, action) => ({
    ...state,
    all: action.payload,
    fetched: true,
  })
}, defaultState)
