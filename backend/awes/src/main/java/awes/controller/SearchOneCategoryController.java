package awes.controller;

import awes.entity.*;
import awes.model.ResultOneCategory;
import awes.model.ResultRecommend;
import awes.model.SearchOneCategory;
import awes.model.TourStreetKorDto;
import awes.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
        System.out.println("Address: " + address);
        System.out.println("Category: " + category);

        List<ResultOneCategory> results = new ArrayList<>();
        List<TourStreetKorDto> resultsTour = new ArrayList<>();
        if ("자연".equals(category)) {
            List<TbVwNature> natures = natureService.findByLanguageAndAddress("ko", address);
            for (TbVwNature nature : natures) {
                ResultOneCategory roc = new ResultOneCategory(nature.getNewAddress());
                roc.setName(nature.getName());
                roc.setContentUrl(nature.getContentUrl());
                roc.setAddress(nature.getAddress());
                roc.setPhoneNumber(nature.getPhoneNumber());
                roc.setWebsite(nature.getWebsite());
                results.add(roc);
            }
        } else if ("쇼핑".equals(category)) {
            List<TbVwShopping> shoppings = shoppingService.findByLanguageAndAddress("ko", address);
            for (TbVwShopping shopping : shoppings) {
                ResultOneCategory roc = new ResultOneCategory(shopping.getNewAddress());
                roc.setName(shopping.getName());
                roc.setContentUrl(shopping.getContentUrl());
                roc.setAddress(shopping.getAddress());
                roc.setPhoneNumber(shopping.getPhoneNumber());
                roc.setWebsite(shopping.getWebsite());
                results.add(roc);
            }
        }else if ("명소".equals(category)) {
            List<TbVwAttractions> attractions = attractionsService.findByLanguageAndAddress("ko", address);
            for(TbVwAttractions attraction : attractions) {
                ResultOneCategory roc = new ResultOneCategory(attraction.getNewAddress());
                roc.setName(attraction.getName());
                roc.setContentUrl(attraction.getContentUrl());
                roc.setAddress(attraction.getAddress());
                roc.setPhoneNumber(attraction.getPhoneNumber());
                roc.setWebsite(attraction.getWebsite());
                results.add(roc);
            }
        }else if ("관광거리".equals(category)) {
            List<TbSebcTourStreetKor> tbSebcTourStreetKors = sebcTourStreetKorService.findByAddress(address);
            for(TbSebcTourStreetKor sebcTourStreetKor : tbSebcTourStreetKors) {
                TourStreetKorDto roc = new TourStreetKorDto();
                roc.setKey(sebcTourStreetKor.getKey());
                roc.setSearchKeyword(sebcTourStreetKor.getSearchKeyword());
                roc.setAlias(sebcTourStreetKor.getAlias());
                roc.setDisplayName(sebcTourStreetKor.getDisplayName());
                roc.setLotAddress(sebcTourStreetKor.getLotAddress());
                roc.setLegalCity(sebcTourStreetKor.getLegalCity());
                roc.setLegalDistrict(sebcTourStreetKor.getLegalDistrict());
                roc.setLegalTown(sebcTourStreetKor.getLegalTown());
                roc.setAdminCity(sebcTourStreetKor.getAdminCity());
                roc.setAdminDistrict(sebcTourStreetKor.getAdminDistrict());
                roc.setAdminTown(sebcTourStreetKor.getAdminTown());
                roc.setCenterCoordX(sebcTourStreetKor.getCenterCoordX());
                roc.setCenterCoordY(sebcTourStreetKor.getCenterCoordY());
                resultsTour.add(roc);
            }
        }else if ("문화".equals(category)) {
            // 추가 예정
            System.out.println("문화 데이터 추가 예정");
        }else if ("음식".equals(category)) {
            List<TbVwRestaurants> restaurants = restaurantsService.findByLanguageAndAddress("ko", address);
            for (TbVwRestaurants restaurant : restaurants) {
                ResultOneCategory roc = new ResultOneCategory(restaurant.getNewAddress());
                roc.setName(restaurant.getName());
                roc.setContentUrl(restaurant.getContentUrl());
                roc.setAddress(restaurant.getAddress());
                roc.setPhoneNumber(restaurant.getPhoneNumber());
                roc.setWebsite(restaurant.getWebsite());
                results.add(roc);
            }

        }else if ("외국인".equals(category)) {
            List<TbVwShopping> shoppings = shoppingService.findByLanguageAndAddress("ko", address);
            for (TbVwShopping shopping : shoppings) {
                ResultOneCategory roc = new ResultOneCategory(shopping.getNewAddress());
                roc.setName(shopping.getName());
                roc.setContentUrl(shopping.getContentUrl());
                roc.setAddress(shopping.getAddress());
                roc.setPhoneNumber(shopping.getPhoneNumber());
                roc.setWebsite(shopping.getWebsite());
                results.add(roc);
            }
        }
       return results;

    }


    @GetMapping("/recommendLocation")
    public List<ResultRecommend> recommendLocation(
            @RequestParam(value = "address") String address,
            @RequestParam(value = "attractions", defaultValue = "0") int attractions,
            @RequestParam(value = "sights", defaultValue = "0") int sights,
            @RequestParam(value = "culture", defaultValue = "0") int culture,
            @RequestParam(value = "shopping", defaultValue = "0") int shopping,
            @RequestParam(value = "nature", defaultValue = "0") int nature,
            @RequestParam(value = "food", defaultValue = "0") int food,
            @RequestParam(value = "foreigner", defaultValue = "0") int foreigner
    ) {
        //

        List<ResultRecommend> resultRecommendList = new ArrayList<>();
        // 쿼리 조회하는 부분 필요

        if (attractions > 0){
            // 해당 테이블 조회해서 해당 숫자만큼 해당 주소 영역의 row를 추출하여 리스트에 더해줌
            resultRecommendList.add(new ResultRecommend("관광거리1"));
            resultRecommendList.add(new ResultRecommend("관광거리2"));
        }
        if (sights > 0){
            // 해당 테이블 조회해서 해당 숫자만큼 해당 주소 영역의 row를 추출하여 리스트에 더해줌
            resultRecommendList.add(new ResultRecommend("명소1"));
            resultRecommendList.add(new ResultRecommend("명소2"));
            resultRecommendList.add(new ResultRecommend("명소3"));
        }

        return resultRecommendList;
    }


}
