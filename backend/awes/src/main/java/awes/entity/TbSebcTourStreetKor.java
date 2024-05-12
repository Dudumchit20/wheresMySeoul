package awes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.locationtech.jts.geom.Point;
@Entity
@Table(name = "tb_sebc_tour_street_kor")
public class TbSebcTourStreetKor {

    @Id
    @Column(name = "tour_key")
    private String key;

    @Column(name = "search_keyword")
    private String searchKeyword;

    @Column(name = "alias")
    private String alias;

    @Column(name = "final_display_name")
    private String displayName;

    @Column(name = "lot_address")
    private String lotAddress;

    @Column(name = "legal_city")
    private String legalCity;

    @Column(name = "legal_district")
    private String legalDistrict;

    @Column(name = "legal_neighborhood")
    private String legalTown;

    @Column(name = "admin_city")
    private String adminCity;

    @Column(name = "admin_district")
    private String adminDistrict;

    @Column(name = "admin_neighborhood")
    private String adminTown;

    @Column(name = "longitude")
    private Double centerCoordX;

    @Column(name = "latitude")
    private Double centerCoordY;

    // Assuming usage of Hibernate Spatial with a Point type for this example.
    @Column(name = "location", columnDefinition = "Point")
    private Point location;


    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getLotAddress() {
        return lotAddress;
    }

    public void setLotAddress(String lotAddress) {
        this.lotAddress = lotAddress;
    }

    public String getLegalCity() {
        return legalCity;
    }

    public void setLegalCity(String legalCity) {
        this.legalCity = legalCity;
    }

    public String getLegalDistrict() {
        return legalDistrict;
    }

    public void setLegalDistrict(String legalDistrict) {
        this.legalDistrict = legalDistrict;
    }

    public String getLegalTown() {
        return legalTown;
    }

    public void setLegalTown(String legalTown) {
        this.legalTown = legalTown;
    }

    public String getAdminCity() {
        return adminCity;
    }

    public void setAdminCity(String adminCity) {
        this.adminCity = adminCity;
    }

    public String getAdminDistrict() {
        return adminDistrict;
    }

    public void setAdminDistrict(String adminDistrict) {
        this.adminDistrict = adminDistrict;
    }

    public String getAdminTown() {
        return adminTown;
    }

    public void setAdminTown(String adminTown) {
        this.adminTown = adminTown;
    }

    public Double getCenterCoordX() {
        return centerCoordX;
    }

    public void setCenterCoordX(Double centerCoordX) {
        this.centerCoordX = centerCoordX;
    }

    public Double getCenterCoordY() {
        return centerCoordY;
    }

    public void setCenterCoordY(Double centerCoordY) {
        this.centerCoordY = centerCoordY;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }
}