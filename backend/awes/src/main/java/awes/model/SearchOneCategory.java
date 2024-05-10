package awes.model;

public class SearchOneCategory {
    private String address;
    private String category;
    // 사용자가 주소(ex. 중구)와 항목(ex. 자연)을 넘겨줄 때 쓰이는 객체
    public SearchOneCategory(String address, String category) {
        this.address = address;
        this.category = category;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
