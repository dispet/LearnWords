const Settings = require('./setting.model');
// const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  let setting = await Settings.findOne({ userId });
  if (!setting) {
    // throw new NOT_FOUND_ERROR('Cannot find setting');
    const settingDef = {
      optional: {
        isTranslationDisplay: true,
        isControlsDisplay: true
      }
    };
    setting = await upsert(userId, settingDef);
  }

  return setting;
};

const upsert = async (userId, setting) =>
  Settings.findOneAndUpdate(
    { userId },
    { $set: setting },
    { upsert: true, new: true }
  );

const remove = async userId => Settings.deleteOne({ userId });

module.exports = { get, upsert, remove };
