package kr.smhrd.entity;

import java.sql.Timestamp;

public class TB_Chatroom {
    private long croom_idx;
    private String croom_title;
    private String croom_info;
    private Timestamp created_at;
    private String user_id;
    private int croom_limit;
    private String croom_status;
    private long phone_idx;

    // Getters and Setters
    public long getCroom_idx() { return croom_idx; }
    public void setCroom_idx(long croom_idx) { this.croom_idx = croom_idx; }
    public String getCroom_title() { return croom_title; }
    public void setCroom_title(String croom_title) { this.croom_title = croom_title; }
    public String getCroom_info() { return croom_info; }
    public void setCroom_info(String croom_info) { this.croom_info = croom_info; }
    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }
    public String getUser_id() { return user_id; }
    public void setUser_id(String user_id) { this.user_id = user_id; }
    public int getCroom_limit() { return croom_limit; }
    public void setCroom_limit(int croom_limit) { this.croom_limit = croom_limit; }
    public String getCroom_status() { return croom_status; }
    public void setCroom_status(String croom_status) { this.croom_status = croom_status; }
    public long getPhone_idx() { return phone_idx; }
    public void setPhone_idx(long phone_idx) { this.phone_idx = phone_idx; }
}