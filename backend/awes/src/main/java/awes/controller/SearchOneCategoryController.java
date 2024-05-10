package awes.controller;

import awes.entity.TbVwNature;
import awes.entity.TbVwShopping;
import awes.model.ResultOneCategory;
import awes.model.ResultRecommend;
import awes.model.SearchOneCategory;
import awes.service.TbVwNatureService;
import awes.service.TbVwShoppingService;
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


    String address, category;
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

        List<ResultOneCategory> results = new ArrayList<>();
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
        this.address = address;
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
