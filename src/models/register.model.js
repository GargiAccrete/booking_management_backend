const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type, statusCodes } = require('../config/const.config');

const tableName = 'restaurant';

const fetchAll = async (data) => {
  const query = `SELECT * FROM ${tableName}
  WHERE status != ?`
  const qData = {
    data: [],
    totalRows: '',
  };

  const countParams = [dataStatusValue.DELETED];
  const resultData = await dbConnection.query(query,countParams);
  qData['data'] = resultData || [];
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
    data.dataStatusValue.DELETED,
    data.created_at,
    data.created_by,
    data.modified_at,
    data.modified_by,
  ];
 
  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

const viewById = async (id) =>{
    
    const query = `SELECT * FROM ${tableName} WHERE id = ? AND status != ?`;
    const params = [id, dataStatusValue.DELETED]
    const qData = await dbConnection.query(query, params);
    return qData[0] || null;
}


const update = async (id, data) => {
    
    const query = `UPDATE ${tableName} SET 
    business_type = ?,
    legal_name = ?,
    brand_associate = ?,
    address_line_1 = ?,
    address_line_2 = ?,
    city = ?,
    state = ?,
    pincode = ?,
    business_area = ?,
    contact_no = ?, 
    modified_at = ?,
    modified_by = ?         
    WHERE id = ? AND status != ?`;
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
      data.modified_at,
      data.modified_by,
      id,
      dataStatusValue.DELETED
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

module.exports = {
  fetchAll,
  create,
  viewById,
  update,
  update,
  deleteById
};