package awes.model;

public class TourStreetKorDto {

    private String key;
    private String searchKeyword;
    private String alias;
    private String displayName;
    private String lotAddress;
    private String legalCity;
    private String legalDistrict;
    private String legalTown;
    private String adminCity;
    private String adminDistrict;
    private String adminTown;
    private Double centerCoordX;
    private Double centerCoordY;

    // 기본 생성자
    public TourStreetKorDto() {
    }

    // 모든 필드를 포함하는 생성자
    public TourStreetKorDto(String key, String searchKeyword, String alias, String displayName, String lotAddress,
                            String legalCity, String legalDistrict, String legalTown, String adminCity,
                            String adminDistrict, String adminTown, Double centerCoordX, Double centerCoordY) {
        this.key = key;
        this.searchKeyword = searchKeyword;
        this.alias = alias;
        this.displayName = displayName;
        this.lotAddress = lotAddress;
        this.legalCity = legalCity;
        this.legalDistrict = legalDistrict;
        this.legalTown = legalTown;
        this.adminCity = adminCity;
        this.adminDistrict = adminDistrict;
        this.adminTown = adminTown;
        this.centerCoordX = centerCoordX;
        this.centerCoordY = centerCoordY;
    }

    // 게터와 세터 메소드
    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
    public String getSearchKeyword() { return searchKeyword; }
    public void setSearchKeyword(String searchKeyword) { this.searchKeyword = searchKeyword; }
    public String getAlias() { return alias; }
    public void setAlias(String alias) { this.alias = alias; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getLotAddress() { return lotAddress; }
    public void setLotAddress(String lotAddress) { this.lotAddress = lotAddress; }
    public String getLegalCity() { return legalCity; }
    public void setLegalCity(String legalCity) { this.legalCity = legalCity; }
    public String getLegalDistrict() { return legalDistrict; }
    public void setLegalDistrict(String legalDistrict) { this.legalDistrict = legalDistrict; }
    public String getLegalTown() { return legalTown; }
    public void setLegalTown(String legalTown) { this.legalTown = legalTown; }
    public String getAdminCity() { return adminCity; }
    public void setAdminCity(String adminCity) { this.adminCity = adminCity; }
    public String getAdminDistrict() { return adminDistrict; }
    public void setAdminDistrict(String adminDistrict) { this.adminDistrict = adminDistrict; }
    public String getAdminTown() { return adminTown; }
    public void setAdminTown(String adminTown) { this.adminTown = adminTown; }
    public Double getCenterCoordX() { return centerCoordX; }
    public void setCenterCoordX(Double centerCoordX) { this.centerCoordX = centerCoordX; }
    public Double getCenterCoordY() { return centerCoordY; }
    public void setCenterCoordY(Double centerCoordY) { this.centerCoordY = centerCoordY; }
}
