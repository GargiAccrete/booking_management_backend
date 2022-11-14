const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'document_category_master';

const fetchAll = async (page, info, property_id) => {
  const qData = {
    data: [],
    totalRows: '',
  };
  let limtString = "";
  let query_str = "";

  if (info.user_type != user_type.ADMIN) {
    query_str = " AND p.user_id = " + info.userId;
  }
  if (info.queryData && info.queryData.category_id) {
    query_str = " AND pc.parent_id = " + info.queryData.category_id;
  } else {
    query_str = " AND pc.parent_id IS NULL";
  }

  if(page) {
    const countQuery = `SELECT 
                          count(pc.id) as total
                        FROM ${tableName} pc
                        JOIN property_master p ON p.id = pc.property_id
                        WHERE pc.status != ? AND pc.property_id = ? ${query_str}`;
    const countParams = [dataStatusValue.DELETED, property_id];
    const countData = await dbConnection.query(countQuery, countParams);
    qData["totalRows"] = Number(countData[0]['total']);
    const offset = (pageConfig.USERS * page) - pageConfig.USERS;
    limtString = ` LIMIT ${offset},${pageConfig.USERS}`;
  }

  const query = `SELECT 
                  pc.id, pc.property_id, pc.name, pc.status, pc.created_at 
                FROM ${tableName} pc
                WHERE pc.status != ? AND pc.property_id = ? ${query_str} ${limtString}`;
  const params = [dataStatusValue.DELETED, property_id];
  const resultData = await dbConnection.query(query, params);
  qData["data"] = resultData || [];
  return qData;
};

const create = async (data) => {
  const query = `INSERT INTO ${tableName} 
            (parent_id, property_id, name, status, created_at, modified_at, modified_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.parent_id,
    data.property_id,
    data.name,
    data.status,
    data.created_at,
    data.modified_at,
    data.modified_by,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

const viewById = async (id, info) => {
  let query_str = "";
  if (info.user_type != user_type.ADMIN) {
    query_str = " AND p.user_id = " + info.userId
  }
  const query = `SELECT 
                pc.property_id, pc.name, pc.status, pc.created_at 
                FROM ${tableName} pc
                JOIN property_master p ON p.id = pc.property_id
                WHERE pc.id = ? AND pc.status != ? ${query_str}`;
  const params = [id, dataStatusValue.DELETED];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const update = async (id, data) => {
  const query = `UPDATE ${tableName} SET 
            name = ?, modified_at = ?, modified_by = ?            
            WHERE id = ?`;
  const params = [
    data.name,
    data.modified_at,
    data.modified_by,
    id,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

const deleteById = async (id, data) => {
  const query = `UPDATE ${tableName} SET status = ?, modified_at = ?, modified_by = ? WHERE id = ?`;
  const params = [dataStatusValue.DELETED, data.modified_at, data.modified_by, id];

  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

const checkCategoryByName = async (name, property_id, parent_id, id="") => {
  let query_str = "";
  if (parent_id) {
    query_str = " AND parent_id = " + parent_id;
  } else {
    query_str = " AND parent_id IS NULL";
  }
  if (id) {
    query_str = query_str + " AND id != " + id;
  }
  const query = `SELECT 
                  id
                FROM ${tableName} 
                WHERE name = ? AND status = ? AND property_id = ? ${query_str}`;
  const params = [name, dataStatusValue.ACTIVE, property_id];
  
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

module.exports = {
  fetchAll,
  create,
  viewById,
  update,
  deleteById,
  checkCategoryByName,
};