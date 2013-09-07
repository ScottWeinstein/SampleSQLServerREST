using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using Dapper;

namespace d3sql.Controllers
{
    public class ValuesController : ApiController
    {

        private readonly IDbConnection conn;
        public ValuesController()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["bbSymbols"].ConnectionString;
            conn = new SqlConnection(connectionString);
        }

        
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public IEnumerable<dynamic> GetSample(int id) 
        {
            using (conn)
            {
                conn.Open();
                return conn.Query("select 1 A, 2 B union all select 3, 4");
            }
        }

        public IEnumerable<dynamic> Get(string sql)
        {
            using (conn)
            {
                conn.Open();
                return conn.Query(sql);
            }
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
            
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}