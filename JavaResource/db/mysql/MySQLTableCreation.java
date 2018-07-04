package db.mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class MySQLTableCreation {
	public static void main(String[] args)
	{
		try {
			// 1. connection to DB
			System.out.println("Connection to "+MySQLDBUtil.URL);
				// the instance of the mysql driver will register in DriverManager
			Class.forName("com.mysql.jdbc.Driver").getConstructor().newInstance();
			Connection conn = DriverManager.getConnection(MySQLDBUtil.URL);
			if(conn == null)
				return ;
			System.out.println("get connection successfully!");
			
			// 2.
			Statement stmt = conn.createStatement();
			String sql = "DROP TABLE IF EXISTS categories";
			stmt.executeUpdate(sql);	// will return the rows which are influenced
			sql = "DROP TABLE IF EXISTS history";
			stmt.executeUpdate(sql);
			sql = "DROP TABLE IF EXISTS items";
			stmt.executeUpdate(sql);
			sql = "DROP TABLE IF EXISTS users";
			stmt.executeUpdate(sql);
			System.out.println("import done successfully!");
			sql = "CREATE TABLE items("
					+ "item_id VARCHAR(255) NOT NULL,"
					+ "name varchar(255),"
					+ "rating float,"
					+ "address varchar(255),"
					+ "image_url varchar(255),"
					+ "url varchar(255),"
					+ "distance float,"
					+ "primary key(item_id)"
					+ ")";
			stmt.executeUpdate(sql);
			
			sql = "CREATE TABLE categories("
					+ "item_id varchar(255) not null,"
					+ "category varchar(255) not null,"
					+ "primary key(item_id, category),"
					+ "foreign key(item_id) references items(item_id)"
					+ ")";
			stmt.executeUpdate(sql);
			sql="CREATE TABLE users("
					+ "user_id varchar(255) not null,"
					+ "password varchar(255) not null,"
					+ "first_name varchar(255),"
					+ "last_name varchar(255),"
					+ "primary key (user_id)"
					+ ")";
			stmt.executeUpdate(sql);
			
			sql="create table history("
					+ "user_id varchar(255) not null,"
					+ "item_id varchar(255) not null,"
					+ "last_favor_time TIMESTAMP not null Default current_timestamp,"
					+ "PRIMARY KEY (user_id, item_id),"
					+ "foreign key (item_id) references items(item_id),"
					+ "foreign key (user_id) references users(user_id)"
					+ ")";
			stmt.executeUpdate(sql);
			
			// 3. fake test data
			sql = "INSERT INTO users VALUES("
					+ "'1111','safweqwfasfs', 'xing', 'li')";
			stmt.executeUpdate(sql);
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
}
