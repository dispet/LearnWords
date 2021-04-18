const Statistics = require('./statistic.model');
// const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  let statistic = await Statistics.findOne({ userId });
  if (!statistic) {
    // throw new NOT_FOUND_ERROR('Cannot find statistic');
    const statisticDef = {
      optional: {}
    };
    statistic = await upsert(userId, statisticDef);
  }
  return statistic;
};

const upsert = async (userId, statistic) =>
  Statistics.findOneAndUpdate(
    { userId },
    { $set: statistic },
    { upsert: true, new: true }
  );

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove };
