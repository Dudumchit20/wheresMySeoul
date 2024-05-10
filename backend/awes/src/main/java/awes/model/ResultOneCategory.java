package awes.model;

public class ResultOneCategory {


//    private int id;
//    private String language;
//    private String name;
//    private String contentUrl;
//    private String address;
    private String newAddress;


//    private String phoneNumber;
//    private String website;
//    private String operatingHours;
//    private String operatingDays;
//    private String holidays;
//    private String trafficInfo;

    public ResultOneCategory(String newAddress) {
        this.newAddress = newAddress;
    }
    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
    }

}
