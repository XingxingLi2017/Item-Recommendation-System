package db.mysql;

public class MySQLDBUtil {
	private static final String HOSTNAME = "localhost";
	private static final String PORT_NUM = "8889"; // database port
	private static final String USERNAME = "root";
	private static final String PASSWORD = "root";
	private static final String DB_NAME = "laiproject";
	public static final String URL = "jdbc:mysql://"
	+ HOSTNAME + ":" + PORT_NUM + "/" + DB_NAME
	+ "?user=" + USERNAME + "&password=" + PASSWORD + "&autoReconnect=true&serverTimezone=UTC";
}