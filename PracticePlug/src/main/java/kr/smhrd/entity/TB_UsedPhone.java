

package kr.smhrd.entity;

import java.sql.Timestamp;

public class TB_UsedPhone {
    private long phone_idx;
    private String seller_id;
    private String brand;
    private String model;
    private String capacity;
    private String color;
    private String quality;
    private int price;
    private String memo;
    private Timestamp created_at;
    private String phone_img1;
    private String phone_img2;
    private String phone_img3;
    private String deal_status;

    // Getters and Setters
    public long getPhone_idx() { return phone_idx; }
    public void setPhone_idx(long phone_idx) { this.phone_idx = phone_idx; }
    public String getSeller_id() { return seller_id; }
    public void setSeller_id(String seller_id) { this.seller_id = seller_id; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getCapacity() { return capacity; }
    public void setCapacity(String capacity) { this.capacity = capacity; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getQuality() { return quality; }
    public void setQuality(String quality) { this.quality = quality; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }
    public String getPhone_img1() { return phone_img1; }
    public void setPhone_img1(String phone_img1) { this.phone_img1 = phone_img1; }
    public String getPhone_img2() { return phone_img2; }
    public void setPhone_img2(String phone_img2) { this.phone_img2 = phone_img2; }
    public String getPhone_img3() { return phone_img3; }
    public void setPhone_img3(String phone_img3) { this.phone_img3 = phone_img3; }
    public String getDeal_status() { return deal_status; }
    public void setDeal_status(String deal_status) { this.deal_status = deal_status; }
}
    
    
    
    
