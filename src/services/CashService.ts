/**
 * This service handles functionality related to cash accounts
 *
 */
import axios from 'axios'

// The vuex store instance
import store from '../store';

// The vuex store mutation types
import * as mutationTypes from '../store/mutation-types.js';

// Service exposing the urls for the API
import * as ApiUrls from './ApiUrlService';

// Utility service exposing various free-form functionalities
import UtilityService from './UtilityService'

/**
 * Change the selected cash account ID
 *
 * @param cashAccountID
 */
let changeSelectedNairaCashAccount = (cashAccountID: number, startDate = UtilityService.getDefaultCashStatementStartDate(),
                                      endDate = UtilityService.getDefaultCashStatementEndDate()) => {
  store.commit(mutationTypes.CHANGE_SELECTED_CASH_ACCOUNT, cashAccountID)

  // Get the cash statements again, since the cash account has been changed
  getNairaCashStatements(startDate, endDate)
 }

 /**
  * Get the naira cash statements for the account selected by the user
  *
  */
 let getNairaCashStatements = (startDate = UtilityService.getDefaultCashStatementStartDate(), endDate = UtilityService.getDefaultCashStatementEndDate()) => {
  console.group();
    console.log(startDate, endDate)
  console.groupEnd()
  const cashAccountNumber = store.state.cash.selectedNairaCashAccount.name

    axios({
      method: 'POST',
      url: ApiUrls.GetCashAccountStatements,
      data: {
        accountNumber: cashAccountNumber,
        startDate: startDate,
        endDate: endDate
      }
    }).then((response) => {

      const responseData = response.data.item

      /**
       * Either a single object, or an array of objects will be returned.
       * This ensures that we always have an array of objects
       */
      let cashStatements = (responseData.constructor === Array) ? responseData : [responseData]

      store.commit(mutationTypes.SET_NAIRA_CASH_STATEMENTS, cashStatements)

    }).catch((response) => {

    })
 }



 export default {
   changeSelectedNairaCashAccount,
   getNairaCashStatements
 }