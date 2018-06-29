package rpc;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class RpcHelper {
	public static void writeJsonObject(HttpServletResponse response, JSONObject obj) throws IOException{
		PrintWriter out = response.getWriter();
		try {
			response.setContentType("application/JSON");
			response.addHeader("Access-Control-Allow-Origin", "*");
			out.println(obj);
			out.flush();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			out.close();
		}
	}
	public static void writeJSONArray(HttpServletResponse response, JSONArray array) throws IOException{
		PrintWriter out = response.getWriter();
		try {
			response.setContentType("application/json");
			response.addHeader("Access-control-allow-origin", "*");
			out.println(array);
			out.flush();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally {
			out.close();
		}
	}
}
