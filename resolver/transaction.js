import _MySQL from '../helpers/mySQL.js';
import Validate from '../helpers/Validate.js';
import ThrowError from '../helpers/ThrowError.js';
import { DateTime } from 'luxon';

export default {
  Query: {
    GetTransactions: async (_, { }, context) => {
      let transaction
      try {
        transactions = await _MySQL.findMany('transaction')
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }
      if (!transaction.length <= 0) {
        return [];
      }
      return transaction;
    }
  },
  Mutation: {
    CreateTransaction: async (_, { details }, context) => {

      if (!Validate.object(details)) {
        ThrowError('#INVALID_INPUT');
      }


      let inserted;

      try {
        
        details.due_date = DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss');

        inserted = await _MySQL.insertOne('transaction', details);
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!inserted) {
        ThrowError('#AN_ERROR_OCCURRED');
      }
      return inserted;
    },
    UpdateTransaction: async (_, { id, details }, context) => {
      if (!Validate.positiveInteger(id)) {
        ThrowError('#INVALID_INPUT');
      }
      if (!Validate.object(details)) {
        ThrowError('#INVALID_INPUT');
      }

      let updated;

      try {
        updated = await _MySQL.updateOne('transactions', details, { id });
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!updated) {
        ThrowError('#AN_ERROR_OCCURRED');
      }

      return updated;

    },
    DeleteTransaction: async (_, { id }, context) => {
      if (!Validate.positiveInteger(id)) {
        ThrowError('#INVALID_INPUT');
      }

      let deleted
      try {
        deleted = await _MySQL.deleteOne('transaction', { id })
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!deleted) {
        ThrowError('#AN_ERROR_OCCURRED');
      }

      return deleted;
    }
  }
}