const AppCache = require( "node-cache" );
const policyCache = new AppCache();

const setCache = (key, val, ttl) => {
  const success = policyCache.set( key, val, ttl);
};

const getCache = (key) => {  
  const result = policyCache.get( key );
  return result;
};

const removeCache = (key) => {  
  policyCache.take( key );
}


module.exports = {
  setCache,
  getCache,
  removeCache,
};