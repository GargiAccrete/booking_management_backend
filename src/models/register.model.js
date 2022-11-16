const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'restaurant';

const fetchAll = async (data) => {
  const query = `SELECT * FROM ${tableName}`
  const qData = {
    data: [],
    totalRows: '',
  };

  const resultData = await dbConnection.query(query);
  qData["data"] = resultData || [];
  return qData;
};


const create = async (data) => {
  const query = `INSERT INTO ${tableName} 
            (business_type,
              legal_name,
              brand_associate,
              address_line_1,
              address_line_2,
              city,
              state,
              pincode,
              business_area,
              contact_no, 
              status, 
              created_at,
              created_by, 
              modified_at,
               modified_by) 
            VALUES ( ?,
               ?,?,?,?,?,
                   ?,?,?,?,?,?,?,?,?)`;
  const params = [
    data.business_type,
    data.legal_name,
    data.brand_associate,
    data.address_line_1,
    data.address_line_2,
    data.city,
    data.state,
    data.pincode,
    data.business_area,
    data.contact_no,
    data.status,
    data.created_at,
    data.created_by,
    data.modified_at,
    data.modified_by,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

const viewById = async (id) =>{
  var userId = req.params.id;
  const query = `SELECT * FORM ${tableName} WHERE id=${userId}`;

  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
}

// const viewById = async (id, info) => {
//   let query_str = "";
//   if (info.user_type != user_type.ADMIN) {
//     query_str = " AND p.user_id = " + info.userId
//   }
//   const query = `SELECT 
//                 pc.property_id, pc.name, pc.status, pc.created_at 
//                 FROM ${tableName} pc
//                 JOIN property_master p ON p.id = pc.property_id
//                 WHERE pc.id = ? AND pc.status != ? ${query_str}`;
//   const params = [id, dataStatusValue.DELETED];
//   const qData = await dbConnection.query(query, params);
//   return qData[0] || null;
// };

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

// const checkCategoryByName = async (name, property_id, parent_id, id="") => {
//   let query_str = "";
//   if (parent_id) {
//     query_str = " AND parent_id = " + parent_id;
//   } else {
//     query_str = " AND parent_id IS NULL";
//   }
//   if (id) {
//     query_str = query_str + " AND id != " + id;
//   }
//   const query = `SELECT 
//                   id
//                 FROM ${tableName} 
//                 WHERE name = ? AND status = ? AND property_id = ? ${query_str}`;
//   const params = [name, dataStatusValue.ACTIVE, property_id];
  
//   const qData = await dbConnection.query(query, params);
//   return qData[0] || null;
// };

module.exports = {
  fetchAll,
  create,
  viewById,
  update,
  deleteById,
  // checkCategoryByName,
};