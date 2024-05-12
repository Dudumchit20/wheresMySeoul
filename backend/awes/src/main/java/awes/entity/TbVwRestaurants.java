package awes.entity;


import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "tb_vw_restaurants")
public class TbVwRestaurants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "language")
    private String language;
    @Column(name = "name")
    private String name;
    @Column(name = "content_url")
    private String contentUrl;
    @Column(name = "old_address")
    private String address;
    @Column(name = "new_address")
    private String newAddress;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "website")
    private String website;
    @Column(name = "operating_hours")
    private String operatingHours;
    @Column(name = "traffic_info")
    private String trafficInfo;
    @Column(name = "homepage_language")
    private String homepageLanguage;
    @Column(name = "main_dish")
    private String mainDish;
    @Column(name = "latitude")
    private Double latitude;
    @Column(name = "longitude")
    private Double longitude;

    // Note: Depending on how you handle spatial data, you might need to use a specific type or custom converter for the location.
    // Assuming usage of Hibernate Spatial with a Point type for this example.
    @Column(name = "location", columnDefinition = "Point")
    private Point location;; // Adjust the type depending on your JPA provider's support for spatial types.

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

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getMainDish() {
        return mainDish;
    }

    public void setMainDish(String mainDish) {
        this.mainDish = mainDish;
    }
}
