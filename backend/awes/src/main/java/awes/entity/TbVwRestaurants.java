package awes.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_vw_restaurants")
public class TbVwRestaurants {

    @Id
    private Integer id;
    private String language;
    private String name;
    private String contentUrl;
    private String address;
    private String newAddress;
    private String phoneNumber;
    private String website;
    private String operatingHours;
    private String trafficInfo;
    private String homepageLanguage;
    private String signatureDish;

    // Constructors, Getters, and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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

    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
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

    public String getOperatingHours() {
        return operatingHours;
    }

    public void setOperatingHours(String operatingHours) {
        this.operatingHours = operatingHours;
    }

    public String getTrafficInfo() {
        return trafficInfo;
    }

    public void setTrafficInfo(String trafficInfo) {
        this.trafficInfo = trafficInfo;
    }

    public String getHomepageLanguage() {
        return homepageLanguage;
    }

    public void setHomepageLanguage(String homepageLanguage) {
        this.homepageLanguage = homepageLanguage;
    }

    public String getSignatureDish() {
        return signatureDish;
    }

    public void setSignatureDish(String signatureDish) {
        this.signatureDish = signatureDish;
    }
}
