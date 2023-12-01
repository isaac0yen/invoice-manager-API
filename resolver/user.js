import _MySQL from '../helpers/mySQL.js';
import Validate from '../helpers/Validate.js';
import ThrowError from '../helpers/ThrowError.js';

export default {
  Query: {
    GetUsers: async () => {

      let users;

      try {
        users = await _MySQL.findMany('user');
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!users.length <= 0) {
        return [];
      }
      return users;
    }
  },
  Mutation: {
    CreateUser: async (_, { details }, context) => {

      if (!Validate.object(details)) {
        ThrowError('#INVALID_INPUT');
      }

      let inserted;

      try {
        inserted = await _MySQL.insertOne('user', details);
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!inserted > 0) {
        ThrowError('#AN_ERROR_OCCURRED');
      }
      return inserted;

    },
    UpdateUser: async (_, { user_id, details }, context) => {

      if (!Validate.positiveInteger(user_id)) {
        ThrowError('#INVALID_INPUT');
      }

      if (!Validate.object(details)) {
        ThrowError('#INVALID_INPUT');
      }

      let updated;

      try {
        updated = await _MySQL.updateOne('user', details, { user_id });
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!updated > 0) {
        ThrowError('#AN_ERROR_OCCURRED');
      }

      return updated;

    },
    DeleteUser: async (_, { user_id }, context) => {

      if (!Validate.positiveInteger(user_id)) {
        ThrowError('#INVALID_INPUT');
      }

      let deleted;

      try {
        deleted = await _MySQL.deleteOne('user', user_id);
      } catch (error) {
        console.error(error);
        ThrowError('#AN_ERROR_OCCURRED');
      }

      if (!deleted > 0) {
        ThrowError('#AN_ERROR_OCCURRED');
      }
      return deleted;

    },
  }
}