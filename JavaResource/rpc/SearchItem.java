package rpc;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import db.DBConnection;
import db.DBConnectionFactory;
import entity.Item;

/**
 * Servlet implementation class SearchItem
 */
//@WebServlet("/search")
@WebServlet(name = "search", urlPatterns = {"/search"})
public class SearchItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchItem() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		double lat=0;
		if(request.getParameter("lat") != null)
			lat = Double.parseDouble(request.getParameter("lat"));
		double lon=0;
		if(request.getParameter("lon") != null)
			lon = Double.parseDouble(request.getParameter("lon"));
		
		String term = request.getParameter("term");
		DBConnection conn = DBConnectionFactory.getConnection();
		try {
			List<Item> items = conn.searchItems(lat, lon, term);
			
			JSONArray arr = new JSONArray();
			for(Item item: items)
			{
				arr.put(item.toJSONObject());
			}
			RpcHelper.writeJSONArray(response, arr);
		}
		finally {
			conn.close();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
