package awes.controller;

import awes.model.ResultOneCategory;
import awes.model.ResultRecommend;
import awes.model.SearchOneCategory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SearchOneCategoryController {
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
            (@RequestParam(value="address") String address,
             @RequestParam(value = "category") String category) {
        //
       this.address = address;
       this.category = category;
        List<ResultOneCategory> resultOneCategoryList = new ArrayList<>();
        // 쿼리 조회하는 부분 필요
        if (category.equals("자연")){
            // TbVwNature 테이블의 newAddress 목록을 얻고 싶음
            // language는 ko, newAddress는 this.address가 포함된 문자열인 것으로 필터링
            // resultOneCategoryList에 저장해서 리턴하여 사용자가 받아볼 수 있게
            resultOneCategoryList.add(new ResultOneCategory("서울대공원"));
            resultOneCategoryList.add(new ResultOneCategory("장미공원"));
            resultOneCategoryList.add(new ResultOneCategory("식물원"));
        } else if (category.equals("쇼핑")) {
            // TbVwShopping 테이블의 newAddress 목록을 얻고 싶음
            //  language는 ko, newAddress는 this.address가 포함된 문자열인 것으로 필터링
            // resultOneCategoryList에 저장해서 리턴하여 사용자가 받아볼 수 있게
            resultOneCategoryList.add(new ResultOneCategory("노원백화점"));
            resultOneCategoryList.add(new ResultOneCategory("현대시티아울렛"));
        }
        return resultOneCategoryList;
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
