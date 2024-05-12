package awes.entity;
import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;
@Entity
@Table(name = "tb_vw_entertainment")
public class TbVwEntertainment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "operating_days")
    private String operatingDays;

    @Column(name = "closed_days")
    private String closedDays;

    @Column(name = "traffic_info")
    private String trafficInfo;

    @Column(name = "homepage_language")
    private String homepageLanguage;

    @Column(name = "stroller_rental")
    private String strollerRental;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    // Assuming usage of Hibernate Spatial with a Point type for this example.
    // Uncomment and use the appropriate type if your application handles spatial types.
    @Column(name = "location", columnDefinition = "Point")
    private Point location; // Adjust the type depending on your JPA provider's support for spatial types.

    // getter setter


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

    public String getOperatingDays() {
        return operatingDays;
    }

    public void setOperatingDays(String operatingDays) {
        this.operatingDays = operatingDays;
    }

    public String getClosedDays() {
        return closedDays;
    }

    public void setClosedDays(String closedDays) {
        this.closedDays = closedDays;
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

    public String getStrollerRental() {
        return strollerRental;
    }

    public void setStrollerRental(String strollerRental) {
        this.strollerRental = strollerRental;
    }

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

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }
}
