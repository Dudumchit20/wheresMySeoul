package awes.model;

import awes.entity.*;

import java.util.List;

public class ResultRecommend {
   // List<String> defaultCategory = Arrays.asList("관광거리", "명소", "문화", "쇼핑", "자연", "음식", "외국인");
    List<TbSebcTourStreetKor> tourStreetKor;
    List<TbVwAttractions> attractions;
    List<TbVwEntertainment> entertainment;
    List<TbVwShopping> shoppings;
    List<TbVwNature> nature;
    List<TbVwRestaurants> restaurants;
    List<TbTourInformation> tourInformations;

    public ResultRecommend() {}

    public List<TbSebcTourStreetKor> getTourStreetKor() {
        return tourStreetKor;
    }

    public void setTourStreetKor(List<TbSebcTourStreetKor> tourStreetKor) {
        this.tourStreetKor = tourStreetKor;
    }

    public List<TbVwAttractions> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<TbVwAttractions> attractions) {
        this.attractions = attractions;
    }

    public List<TbVwEntertainment> getEntertainment() {
        return entertainment;
    }

    public void setEntertainment(List<TbVwEntertainment> entertainment) {
        this.entertainment = entertainment;
    }

    public List<TbVwShopping> getShoppings() {
        return shoppings;
    }

    public void setShoppings(List<TbVwShopping> shoppings) {
        this.shoppings = shoppings;
    }

    public List<TbVwNature> getNature() {
        return nature;
    }

    public void setNature(List<TbVwNature> nature) {
        this.nature = nature;
    }

    public List<TbVwRestaurants> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(List<TbVwRestaurants> restaurants) {
        this.restaurants = restaurants;
    }

    public List<TbTourInformation> getTourInformations() {
        return tourInformations;
    }

    public void setTourInformations(List<TbTourInformation> tourInformations) {
        this.tourInformations = tourInformations;
    }
}
