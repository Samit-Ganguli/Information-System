package com.mkyong;

import java.util.List;
import java.util.Map;

import org.bson.Document;

import com.mongodb.BasicDBObject;

public class Track {

	String title;
	String singer;
	List<Object> data;
	Document requestBody;

	public Document getRequestBody() {
		return requestBody;
	}

	public void setRequestBody(Document requestBody) {
		this.requestBody = requestBody;
	}

	public List<Object> getData() {
		return data;
	}

	public void setData(List<Object> data) {
		this.data = data;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSinger() {
		return singer;
	}

	public void setSinger(String singer) {
		this.singer = singer;
	}

	@Override
	public String toString() {
		return "Track [title=" + title + ", singer=" + singer + "]";
	}

}
