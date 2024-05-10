package awes.model;

public class ResultRecommend {
    private String newAddress;
    //private String category;
    public ResultRecommend(String newAddress) {
        this.newAddress = newAddress;
    }

    public String getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(String newAddress) {
        this.newAddress = newAddress;
    }
}
