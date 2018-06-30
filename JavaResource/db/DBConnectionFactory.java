package db;

import java.util.List;
import java.util.Set;

import entity.Item;

public class DBConnectionFactory implements DBConnection {
	private static final String DEFAULT_DB="mysql";


	public static DBConnection getConnection(String db) {
		switch(db) {
			case "mysql":
				return null;

			case "mongdb":
				return null;

			default:
				throw new IllegalArgumentException("invalid db:"+db);
		}
	}

	public static DBConnection getConnection() {
		return getConnection(DEFAULT_DB);
	}

	@Override
	public void close() {
	}

	@Override
	public void setFavoriteItems(String userId, List<String> itemIds) {
	}

	@Override
	public void unsetFavoriteItems(String userId, List<String> itemIds) {
	}

	@Override
	public Set<String> getFavoriteItemIds(String userId) {
		return null;
	}

	@Override
	public Set<Item> getFavoriteItems(String userId) {
		return null;
	}

	@Override
	public Set<String> getCategories(String itemId) {
		return null;
	}

	@Override
	public List<Item> searchItems(double lat, double lon, String term) {
		return null;
	}

	@Override
	public void saveItem(Item item) {
	}

	@Override
	public String getFullname(String userId) {
		return null;
	}

	@Override
	public boolean verifyLogin(String userId, String password) {
		return false;
	}

}
