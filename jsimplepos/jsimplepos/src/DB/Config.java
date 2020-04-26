package DB;

import java.io.File;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author annopnod
 */
public class Config {

    public Exception debug_out_exception;
    Connection conn = null;

    public Config(String path) {
        try {
             Class.forName("org.sqlite.JDBC");
            boolean hasfile = new File(path).exists();
           
            this.conn = DriverManager.getConnection("jdbc:sqlite:" + path);
            if (!hasfile) {
                this.Install("1234");
            }
        } catch (Exception e) {
            this.debug_out_exception = e;
        }
    }

    public boolean Install(String password) {
        try {
            String hashinput = new String(Crypto.Sha256.hash(password.getBytes(Charset.forName("UTF-8"))), StandardCharsets.UTF_8);
            Statement stmt = this.conn.createStatement();
            String sql = "CREATE TABLE pos_config ("
                    + "    c_key VARCHAR (50) PRIMARY KEY,"
                    + "    c_val TEXT); ";
                  
            stmt.executeUpdate(sql);
            sql = "INSERT INTO pos_config (c_key,c_val ) VALUES ('password','"+hashinput+"'  );";
              stmt.executeUpdate(sql);
            stmt.close();

            return true;
        } catch (SQLException ex) {
            ex.printStackTrace();
            this.debug_out_exception = ex;
            return false;
        }
    }
}
