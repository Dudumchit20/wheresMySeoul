package awes.model;

import jakarta.persistence.Column;

public class ResultOneCategory {


//    private int id;
//    private String language;
    private String name;
    private String contentUrl;
    private String address;
    private String newAddress;
    private String phoneNumber;
    private String website;
//    private String operatingHours;
//    private String operatingDays;
//    private String holidays;
//    private String trafficInfo;

    // 위경도 추가
    private Double latitude;
    private Double longitude;

    public ResultOneCategory() {
        //this.newAddress = newAddress;
    }
    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    // 위경도 추가
   public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
