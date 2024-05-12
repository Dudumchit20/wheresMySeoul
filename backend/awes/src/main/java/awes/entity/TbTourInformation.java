package awes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;
import org.locationtech.jts.geom.Point;
@Entity
@Table(name = "tb_tour_information")
public class TbTourInformation {

    @Id
    @Column(name = "name")
    private String tourInfoName;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "city_name")
    private String cityName;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "additional_services", columnDefinition = "TEXT")
    private String additionalServices;

    @Column(name = "closed_days")
    private String holiday;

    @Column(name = "summer_start_time")
    private String summerOpen;

    @Column(name = "summer_end_time")
    private String summerClose;

    @Column(name = "winter_start_time")
    private String winterOpen;

    @Column(name = "winter_end_time")
    private String winterClose;

    @Column(name = "average_staff")
    private Integer averageStaff;

    @Column(name = "english_available", length = 1)
    private Character englishAvailable;

    @Column(name = "japanese_available", length = 1)
    private Character japaneseAvailable;

    @Column(name = "chinese_available", length = 1)
    private Character chineseAvailable;

    @Column(name = "other_languages")
    private String otherLanguages;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "road_address")
    private String address;

    @Column(name = "lot_address")
    private String lotAddress;

    @Column(name = "managing_organization")
    private String operatingOrganization;

    @Column(name = "website_url", columnDefinition = "TEXT")
    private String websiteUrl;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "data_date", columnDefinition = "VARCHAR(20)")
    private String dataDate;

    // Assuming usage of Hibernate Spatial with a Point type for this example.
    // Uncomment and use the appropriate type if your application handles spatial types.
    @Column(name = "location", columnDefinition = "Point")
    private Point location;


    public String getTourInfoName() {
        return tourInfoName;
    }

    public void setTourInfoName(String tourInfoName) {
        this.tourInfoName = tourInfoName;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(String additionalServices) {
        this.additionalServices = additionalServices;
    }

    public String getHoliday() {
        return holiday;
    }

    public void setHoliday(String holiday) {
        this.holiday = holiday;
    }

    public String getSummerOpen() {
        return summerOpen;
    }

    public void setSummerOpen(String summerOpen) {
        this.summerOpen = summerOpen;
    }

    public String getSummerClose() {
        return summerClose;
    }

    public void setSummerClose(String summerClose) {
        this.summerClose = summerClose;
    }

    public String getWinterOpen() {
        return winterOpen;
    }

    public void setWinterOpen(String winterOpen) {
        this.winterOpen = winterOpen;
    }

    public String getWinterClose() {
        return winterClose;
    }

    public void setWinterClose(String winterClose) {
        this.winterClose = winterClose;
    }

    public Integer getAverageStaff() {
        return averageStaff;
    }

    public void setAverageStaff(Integer averageStaff) {
        this.averageStaff = averageStaff;
    }

    public Character getEnglishAvailable() {
        return englishAvailable;
    }

    public void setEnglishAvailable(Character englishAvailable) {
        this.englishAvailable = englishAvailable;
    }

    public Character getJapaneseAvailable() {
        return japaneseAvailable;
    }

    public void setJapaneseAvailable(Character japaneseAvailable) {
        this.japaneseAvailable = japaneseAvailable;
    }

    public Character getChineseAvailable() {
        return chineseAvailable;
    }

    public void setChineseAvailable(Character chineseAvailable) {
        this.chineseAvailable = chineseAvailable;
    }

    public String getOtherLanguages() {
        return otherLanguages;
    }

    public void setOtherLanguages(String otherLanguages) {
        this.otherLanguages = otherLanguages;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLotAddress() {
        return lotAddress;
    }

    public void setLotAddress(String lotAddress) {
        this.lotAddress = lotAddress;
    }

    public String getOperatingOrganization() {
        return operatingOrganization;
    }

    public void setOperatingOrganization(String operatingOrganization) {
        this.operatingOrganization = operatingOrganization;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
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

    public String getDataDate() {
        return dataDate;
    }

    public void setDataDate(String dataDate) {
        this.dataDate = dataDate;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }
}
