package awes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "tb_tour_information")
public class TbTourInformation {

    @Id
    private String tourInfoName;
    private String locationName;
    private String cityName;
    private String districtName;
    private String description;
    private String additionalServices;
    private String holiday;
    private String summerOpen;
    private String summerClose;
    private String winterOpen;
    private String winterClose;
    private Integer averageStaff;
    private Character englishAvailable;
    private Character japaneseAvailable;
    private String chineseAvailable; // Y로 표시된다고 함
    private String otherLanguages;
    private String phoneNumber;
    private String address;
    private String lotAddress;
    private String operatingOrganization;
    private String websiteUrl;
    private Double latitude;
    private Double longitude;
    private java.sql.Date dataDate;

    // Getters and Setters

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

    public String getChineseAvailable() {
        return chineseAvailable;
    }

    public void setChineseAvailable(Character chineseAvailable) {
        this.chineseAvailable = String.valueOf(chineseAvailable);
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

    public Date getDataDate() {
        return dataDate;
    }

    public void setDataDate(Date dataDate) {
        this.dataDate = dataDate;
    }
}
