package rpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
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
	
	public static JSONObject readJsonObject(HttpServletRequest request)
	{
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader reader = request.getReader();
			String line = null;
			while((line = reader.readLine())!= null)
			{
				sb.append(line);
			}
			return new JSONObject(sb.toString());
					
		} catch (IOException | JSONException e) {
			e.printStackTrace();
		}
		return new JSONObject();
		
	}
}
