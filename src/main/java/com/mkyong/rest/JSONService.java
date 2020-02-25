package com.mkyong.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.Document;
import org.codehaus.jackson.map.ObjectMapper;

import com.dataproviders.DataProviderFactory;
import com.dataproviders.DataProvider;
import com.google.gson.Gson;
import com.mkyong.Track;
import com.mongodb.BasicDBObject;
import com.mongodb.trial.PehlaTry;
import com.wallet.master.data.providers.WalletDepartmentImplementer;

@Path("/json/metallica")
public class JSONService {
	
	ObjectMapper mapper = new ObjectMapper();
	DataProviderFactory dataProviderFactory = new DataProviderFactory();

	@GET
	@Path("/get")
	@Produces(MediaType.TEXT_HTML)
	public Response getTrackInJSON() {

		Track track = new Track();
		track.setTitle("Enter Sandman");
		
		PehlaTry pt = new PehlaTry();
		String dataString = pt.findAllData("insertDB", "nayaCollection").toString();
//		track.setSinger(dataString);
		
		return Response.status(200).entity(dataString).build();
	}
	
	@GET
	@Path("/getDepartments")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getDepartments() {
		
		PehlaTry pt = new PehlaTry();
		WalletDepartmentImplementer departmentImplementer = new WalletDepartmentImplementer();
		List<String> dataString = departmentImplementer.getDepartments(null);
		System.out.println(dataString);
		return Response.status(200).entity(dataString.toString())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}
	
	/*@GET
	@Path("/getDepartmentWiseStates")
	@Produces(MediaType.TEXT_HTML)
	public Response getDepartmentWiseStates(@QueryParam stateName) {
		
		PehlaTry pt = new PehlaTry();
		String dataString = pt.findAllData("insertDB", "department_config").toString();
//		track.setSinger(dataString);
		System.out.println(dataString);
		return Response.status(200).entity(dataString)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}*/

	@POST
	@Path("/getQueryData")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response getQueryDataJSON(Track track) {
		Document queryData = track.getRequestBody();
		DataProviderFactory dataProviderFactory = new DataProviderFactory();
		Gson gson = new Gson();
		DataProvider dp = dataProviderFactory.getDataProvider(queryData);
		String dataString = dp.getRequestedStaticData(queryData).toString();
		return Response.status(200).entity(dataString).build();
	}
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*
	@POST
	@Path("/getEntities")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_HTML)
	public Response getEntity(Track track) {
		Map requestBody = track.getRequestBody();
		String dataString = new String();
		try {
			dataString = dataProviderFactory.getDataProvider(requestBody)
													.getStaticData(requestBody)
													.toString();
			System.out.println("Data String  ::  "+dataString);

		} catch(NullPointerException e){
			System.out.println("No data found for the given filters");
			e.printStackTrace();
		}
		
		return Response.status(200).entity(dataString).build();
	}*/
	
	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_HTML)
	public Response createTrackInJSON(Track track) throws IOException {
		
		Document queryData = track.getRequestBody();
		Map queryMap = mapper.convertValue(queryData, HashMap.class);
		DataProviderFactory dataProviderFactory = new DataProviderFactory();
		DataProvider dp = dataProviderFactory.getDataProvider(queryData);
		dp.addEntity(queryData);//.toString();
//		track.setData(Arrays.asList(dataString));
//		System.out.println(dataString);
		return Response.status(201).entity("Success").build();
		
	}
	

	@POST
	@Path("/deleteEntity")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_HTML)
	public Response removeTrackInJSON(Track track) throws IOException {
		
		Document queryData = track.getRequestBody();
		Map queryMap = mapper.convertValue(queryData, HashMap.class);
		DataProviderFactory dataProviderFactory = new DataProviderFactory();
		DataProvider dp = dataProviderFactory.getDataProvider(queryData);
		dp.deleteEntity(queryData);//.toString();
		return Response.status(201).entity("Success").build();
		
	}
	
	
	@POST
	@Path("/updateEntity")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_HTML)
	public Response updateTrackInJSON(Track track) throws IOException {		
		Document queryData = track.getRequestBody();
		Map queryMap = mapper.convertValue(queryData, HashMap.class);
		DataProviderFactory dataProviderFactory = new DataProviderFactory();
		DataProvider dp = dataProviderFactory.getDataProvider(queryData);
		dp.updateEntity(queryData);//.toString();
		return Response.status(201).entity("Success").build();		
	}
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	public static void main(String[] args) throws IOException {
		Track t = new Track();
		t.setSinger("abc");
		t.setTitle("xyz");
		
		Document m = new Document();
//		m.put("name", "samit");
//		m.put("age", 26);
		m.put("EntityType", "Department");
		m.put("Department", "itsl");
		
		String qstring = "{\r\n" + 
				"			\"EntityName\": \"New to ITSL\",\r\n" + 
				"			\"State\": \"New to ITSL\",\r\n" + 
				"			\"StateID\": 2,\r\n" + 
				"			\"DepartmentName\": \"IT Security Lab\",\r\n" + 
				"			\"StateDescription\": \"This state contains information regarding how can a new member be added to ITSL\",\r\n" + 
				"			\"CreatedBy\": \"Randy Marchani\",\r\n" + 
				"			\"CreatedOn\": \"11th September 2018\",\r\n" + 
				"			\"Department\": \"itsl\",\r\n" + 
				"			\"substates\": [\"substate1\", \"substate2\", \"substate3\", \"substate4\"]\r\n" + 
				"		}";
		
		
		LinkedHashMap Query = new LinkedHashMap();
		Query.put("DepartmentID", 2);
		Query.put("Department", "itsl");
//		BasicDBObject Query = BasicDBObject.parse(qstring);
//		ObjectMapper om = new ObjectMapper();
//		om.convertValue(qstring, LinkedHashMap.class);
		m.put("Query", Query);
		t.setRequestBody(m);
		System.out.println(t.getRequestBody());
		
//		Object obj = m;
//		
//		t.setData(Arrays.asList(obj));
		
		PehlaTry pt = new PehlaTry();
//		System.out.println(t.getData());
//		pt.insertRecords(t.getData(), "insertDB", "nayaCollection");
		
//		System.out.println(pt.findAllData("insertDB", "nayaCollection"));
		
		JSONService jss = new JSONService();
//		jss.getEntity(t, "FirstDepartment");
		
//		System.out.println(jss.getQueryDataJSON(t).getEntity());
		System.out.println(jss.getDepartments());
	}
	
}