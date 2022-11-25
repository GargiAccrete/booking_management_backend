const dbConnection = require('../config/db.config');
const {
  dataStatusValue,
  pageConfig,
  user_type,
} = require('../config/const.config');

const tableName = 'user_master';


const fetchAll = async (page, info) => {
  const qData = {
    data: [],
    totalRows: '',
  };
  let limtString = '';
  let query_str = '';

  if (page) {
    const countQuery = `SELECT 
                          count(u.id) as total
                        FROM ${tableName} u
                        WHERE u.status != ? and u.user_type != ? ${query_str}`;
    const countParams = [dataStatusValue.DELETED, user_type.ADMIN];
    const countData = await dbConnection.query(countQuery, countParams);
    qData['totalRows'] = Number(countData[0]['total']);
    const offset = pageConfig.USERS * page - pageConfig.USERS;
    limtString = ` LIMIT ${offset},${pageConfig.USERS}`;
  }

  const query = `SELECT 
                  u.id, CONCAT(u.first_name, " ",u.middle_name, " ",u.last_name) AS name, u.address, u.email, u.photo, u.status, u.contact_number1, u.contact_number2, u.created_at 
                FROM ${tableName} u
                WHERE u.status != ? and u.user_type != ? ${query_str} ${limtString}`;
  const params = [dataStatusValue.DELETED, user_type.ADMIN];
  const resultData = await dbConnection.query(query, params);
  qData['data'] = resultData || [];
  return qData;
};

const create = async (data) => {
  const query = `INSERT INTO ${tableName} 
            (first_name, middle_name, last_name, address, contact_number1, contact_number2, email, password, password_salt, photo, status, created_at, modified_at, modified_by, state, city) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.first_name,
    data.middle_name,
    data.last_name,
    data.address,
    data.contact_number1,
    data.contact_number2,
    data.email,
    data.password,
    data.password_salt,
    data.photo,
    data.status,
    data.created_at,
    data.modified_at,
    data.modified_by,
    data.state,
    data.city,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

const viewById = async (id) => {
  const query = `SELECT 
                u.first_name, u.middle_name, u.last_name, u.address, u.contact_number1, u.contact_number2, u.email, u.photo, u.status, u.created_at, u.state, u.city
                FROM ${tableName} u
                WHERE u.id = ? AND u.status != ?`;
  const params = [id, dataStatusValue.DELETED];

  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const update = async (id, data) => {
  const query = `UPDATE ${tableName} SET 
            first_name = ?, middle_name = ?, last_name = ?, address = ?, contact_number1 = ?, contact_number2 = ?, email = ?, photo = ?, modified_at = ?, modified_by = ?, state = ?, city = ?            
            WHERE id = ?`;
  const params = [
    data.first_name,
    data.middle_name,
    data.last_name,
    data.address,
    data.contact_number1,
    data.contact_number2,
    data.email,
    data.photo,
    data.modified_at,
    data.modified_by,
    data.state,
    data.city,
    id,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

const deleteById = async (id, data) => {
  const query = `UPDATE ${tableName} SET status = ?, modified_at = ?, modified_by = ? WHERE id = ?`;
  const params = [
    dataStatusValue.DELETED,
    data.modified_at,
    data.modified_by,
    id,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};



const checkUserbyEmail = async (email) => {
  const query = `SELECT 
                  id, first_name AS firstName, last_name AS lastName, password, user_type 
                FROM ${tableName} 
                WHERE email = ? AND status = ?`;
  const params = [email, dataStatusValue.ACTIVE];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};


const checkUserbyEmailUpdate = async (email, id) => {
  const query = `SELECT 
                  id, first_name AS firstName, last_name AS lastName, password, user_type 
                FROM ${tableName} 
                WHERE email = ? AND status = ? AND id != ?`;
  const params = [email, dataStatusValue.ACTIVE, id];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const updatePasswordById = async (id, data) => {
  const query = `UPDATE ${tableName} SET password = ?, modified_at = ?, modified_by = ? WHERE id = ?`;
  const params = [data.password, data.modified_at, data.modified_by, id];
  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

const checkUserbyId = async (id) => {
  const query = `SELECT 
                id, password 
                FROM ${tableName} 
                WHERE id = ? AND status = ?`;
  const params = [id, dataStatusValue.ACTIVE];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const fetchFilterList = async (page, info, filters) => {
  const qData = {
    data: [],
    totalRows: '',
  };
  let limitString = '';
  let query_str = '';
  let orderby_str = ' ORDER BY u.id desc';
  let having_str = '';

  if (filters.sort_column && filters.sort_order) {
    const sort_order =
      filters.sort_order === 'asc'
        ? 'asc'
        : filters.sort_order === 'desc'
        ? 'desc'
        : 'asc';
    switch (filters.sort_column) {
      case 'name':
        orderby_str = ` ORDER BY CONCAT(u.first_name, ' ',u.last_name) ${sort_order}`;
        break;
      case 'email':
        orderby_str = ` ORDER BY u.email ${sort_order}`;
        break;
      case 'contact_number':
        orderby_str = ` ORDER BY u.contact_number1 ${sort_order}`;
        break;
      case 'properties':
        orderby_str = ` ORDER BY total_property ${sort_order}`;
        break;
      case 'created_date':
        orderby_str = ` ORDER BY u.created_at ${sort_order}`;
        break;
      default:
        orderby_str = ` ORDER BY u.id desc`;
    }
  }
  if (filters.search_name) {
    query_str = `${query_str} AND CONCAT(u.first_name, ' ',u.last_name) LIKE '%${filters.search_name}%'`;
  }
  if (filters.search_contact_number) {
    query_str = `${query_str} AND u.contact_number1 LIKE '%${filters.search_contact_number}%'`;
  }
  if (filters.search_email) {
    query_str = `${query_str} AND u.email LIKE '%${filters.search_email}%'`;
  }
  if (filters.search_property_count) {
    query_str = `${query_str} AND (SELECT count(p.id) FROM property_master p WHERE p.user_id = u.id) >= ${parseInt(
      filters.search_property_count
    )}`;
  }
  if (filters.search_created_date) {
    query_str = `${query_str} AND DATE_FORMAT (from_unixtime(u.created_at), '%d %b, %Y') LIKE '%${filters.search_created_date}%'`;
  }

  if (page) {
    const countQuery = `SELECT 
                          count(u.id) as total
                        FROM ${tableName} u
                        WHERE u.status != ? and u.user_type != ? ${query_str}`;
    const countParams = [dataStatusValue.DELETED, user_type.ADMIN];
    const countData = await dbConnection.query(countQuery, countParams);
    qData['totalRows'] = Number(countData[0]['total']);
    const offset = pageConfig.USERS * page - pageConfig.USERS;
    limitString = ` LIMIT ${offset},${pageConfig.USERS}`;
  }

  const query = `SELECT 
                  u.id, CONCAT(u.first_name, " ",u.last_name) AS name, u.address, u.email, u.photo, u.status, u.contact_number1, u.contact_number2, u.created_at, (SELECT count(p.id) FROM property_master p WHERE p.user_id = u.id AND p.status != ${dataStatusValue.DELETED}) AS total_property
                FROM ${tableName} u
                WHERE u.status != ? and u.user_type != ? ${query_str} ${orderby_str} ${limitString}`;
  const params = [dataStatusValue.DELETED, user_type.ADMIN];
  const resultData = await dbConnection.query(query, params);

  qData['data'] = resultData || [];
  return qData;
};

const getTotal = async (info) => {
  const qData = {
    totalRows: 0,
  };
  const countQuery = `SELECT 
                        count(u.id) as total
                      FROM ${tableName} u
                      WHERE u.status != ? AND u.user_type != ?`;
  const countParams = [dataStatusValue.DELETED, user_type.ADMIN];
  const countData = await dbConnection.query(countQuery, countParams);
  qData['totalRows'] = Number(countData[0]['total']);
  return qData;
};


module.exports = {
  fetchAll,
  create,
  viewById,
  update,
  deleteById,
  checkUserbyEmail,
  checkUserbyEmailUpdate,
  updatePasswordById,
  checkUserbyId,
  fetchFilterList,
  getTotal,
};
