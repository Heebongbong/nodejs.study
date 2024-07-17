const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs
    // 현재 폴더의 모든 파일을 조회
    .readdirSync(__dirname)
    // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    // 해당 파일의 모델 불러와서 init
    .forEach(file => {
      const model = require(path.join(__dirname, file));
      db[model.name] = model;
      model.initiate(sequelize);
    });

Object.keys(db).forEach(modelName => db[modelName]?.associate?.(db));

module.exports = db;