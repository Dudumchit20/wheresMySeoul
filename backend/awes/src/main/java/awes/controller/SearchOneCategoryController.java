package awes.controller;

import awes.entity.*;
import awes.model.ResultOneCategory;
import awes.model.SearchOneCategory;
import awes.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@RestController
public class SearchOneCategoryController {
    @Autowired
    private TbVwNatureService natureService;
    @Autowired
    private TbVwShoppingService shoppingService;
    @Autowired
    private TbVwAttractionsService attractionsService;
    @Autowired
    private TbSebcTourStreetKorService sebcTourStreetKorService;
    @Autowired
    private TbVwRestaurantsService restaurantsService;
    @Autowired
    private TbTourInformationService tourInformationService;
    @Autowired
    private TbVwEntertainmentService entertainmentService;



    @GetMapping("/testAPI")
    public List<SearchOneCategory> testAPI
            (@RequestParam(value="address") String address,
             @RequestParam(value = "category") String category) {
        // 임시 데이터 리스트 생성
        List<SearchOneCategory> searchOneCategoryList = new ArrayList<>();
        searchOneCategoryList.add(new SearchOneCategory(address, category));
        searchOneCategoryList.add(new SearchOneCategory("테스트_주소", "테스트_카테고리"));

        return searchOneCategoryList;
    }

    @GetMapping("/searchOneCategory")
    public List<ResultOneCategory> searchOneCategory
            (@RequestParam(value="address", defaultValue = "중구") String address,
             @RequestParam(value = "category", defaultValue = "쇼핑") String category) {
        // 여기에서 파라미터 값 출력
        //System.out.println("Address: " + address);
        //System.out.println("Category: " + category);
        System.out.println("=========================");
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println( "SearchOneCategory API Current time is: " + now.format(formatter));
        System.out.println( "입력된 address: "+ address);
        System.out.println("입력된 category: " + category);
        System.out.println("=========================");

        List<ResultOneCategory> results = new ArrayList<>();
        //List<TourStreetKorDto> resultsTour = new ArrayList<>();
        if ("자연".equals(category)) {
            List<TbVwNature> natures = natureService.findByLanguageAndAddress("ko", address);
            for (TbVwNature nature : natures) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(nature.getNewAddress());
                roc.setName(nature.getName());
                roc.setContentUrl(nature.getContentUrl());
                roc.setAddress(nature.getAddress());
                roc.setPhoneNumber(nature.getPhoneNumber());
                roc.setWebsite(nature.getWebsite());
                roc.setLatitude(nature.getLatitude());
                roc.setLongitude(nature.getLongitude());
                results.add(roc);
            }
        } else if ("쇼핑".equals(category)) {
            List<TbVwShopping> shoppings = shoppingService.findByLanguageAndAddress("ko", address);
            for (TbVwShopping shopping : shoppings) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(shopping.getNewAddress());
                roc.setName(shopping.getName());
                roc.setContentUrl(shopping.getContentUrl());
                roc.setAddress(shopping.getAddress());
                roc.setPhoneNumber(shopping.getPhoneNumber());
                roc.setWebsite(shopping.getWebsite());
                roc.setLatitude(shopping.getLatitude());
                roc.setLongitude(shopping.getLongitude());
                results.add(roc);
            }
        }else if ("명소".equals(category)) {
            List<TbVwAttractions> attractions = attractionsService.findByLanguageAndAddress("ko", address);
            for(TbVwAttractions attraction : attractions) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(attraction.getNewAddress());
                roc.setName(attraction.getName());
                roc.setContentUrl(attraction.getContentUrl());
                roc.setAddress(attraction.getAddress());
                roc.setPhoneNumber(attraction.getPhoneNumber());
                roc.setWebsite(attraction.getWebsite());
                roc.setLatitude(attraction.getLatitude());
                roc.setLongitude(attraction.getLongitude());
                results.add(roc);
            }
        }else if ("관광거리".equals(category)) {
            List<TbSebcTourStreetKor> tbSebcTourStreetKors = sebcTourStreetKorService.findByAddress(address);
            for(TbSebcTourStreetKor sebcTourStreetKor : tbSebcTourStreetKors) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(sebcTourStreetKor.getLotAddress());
                roc.setName(sebcTourStreetKor.getDisplayName());
                roc.setContentUrl(sebcTourStreetKor.getAlias());
                roc.setAddress(sebcTourStreetKor.getLotAddress());
                roc.setPhoneNumber("번호없음");
                roc.setWebsite("웹사이트없음");
                roc.setLatitude(sebcTourStreetKor.getCenterCoordY());
                roc.setLongitude(sebcTourStreetKor.getCenterCoordX());
                results.add(roc);
            }
        }else if ("문화".equals(category)) {
            List<TbVwEntertainment> tbVwEntertainments = entertainmentService.findByLanguageAndAddress("ko", address);
            for (TbVwEntertainment entertainment : tbVwEntertainments) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(entertainment.getNewAddress());
                roc.setName(entertainment.getName());
                roc.setContentUrl(entertainment.getContentUrl());
                roc.setAddress(entertainment.getAddress());
                roc.setPhoneNumber(entertainment.getPhoneNumber());
                roc.setWebsite(entertainment.getWebsite());
                roc.setLatitude(entertainment.getLatitude());
                roc.setLongitude(entertainment.getLongitude());
                results.add(roc);
            }
        }else if ("음식".equals(category)) {
            List<TbVwRestaurants> restaurants = restaurantsService.findByLanguageAndAddress("ko", address);
            for (TbVwRestaurants restaurant : restaurants) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(restaurant.getNewAddress());
                roc.setName(restaurant.getName());
                roc.setContentUrl(restaurant.getContentUrl());
                roc.setAddress(restaurant.getAddress());
                roc.setPhoneNumber(restaurant.getPhoneNumber());
                roc.setWebsite(restaurant.getWebsite());
                roc.setLatitude(restaurant.getLatitude());
                roc.setLongitude(restaurant.getLongitude());
                results.add(roc);
            }

        }else if ("외국인".equals(category)) {
            List<TbTourInformation> tourInformations = tourInformationService.findByAddress(address);
            for (TbTourInformation tourInformation : tourInformations) {
                ResultOneCategory roc = new ResultOneCategory();
                roc.setNewAddress(tourInformation.getAddress());
                roc.setName(tourInformation.getTourInfoName());
                roc.setContentUrl(tourInformation.getLocationName());
                roc.setAddress(tourInformation.getLotAddress());
                roc.setPhoneNumber(tourInformation.getPhoneNumber());
                roc.setWebsite(tourInformation.getWebsiteUrl());
                roc.setLatitude(tourInformation.getLatitude());
                roc.setLongitude(tourInformation.getLongitude());
                results.add(roc);
            }
        }
       return results;

    }





}
