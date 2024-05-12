package awes.controller;

import awes.model.ResultRecommendTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class RecommendController {

    List<String> defaultCategory = Arrays.asList("관광거리", "명소", "문화", "쇼핑", "자연", "음식", "외국인");
    boolean numIsOverTen = false;

    @GetMapping("/recommend")
    public List<ResultRecommendTest> resultRecommendList(
            @RequestParam(value = "address", defaultValue = "중구") String address,
            @RequestParam(value="addressX", defaultValue = "0") double addressX,
            @RequestParam(value="addressY", defaultValue = "0") double addressY,
            @RequestParam(value="num", defaultValue = "0") int num,
            @RequestParam(value="category") List<String> category
    ){
        List<ResultRecommendTest> recommendList = new ArrayList<>();

        if (category == null || category.isEmpty()) {
            category = defaultCategory; // 기본 값 넣기
        }

        // num이 10 이상인지 체크해두기
        if(num >=10){
            // num이 10개 이상이어서 10으로 올 때
            // 각 항목 당 모두 조회
            numIsOverTen = true;

        } else if (num<10) {
            // num이 10개 미만일 때
            // 각 항목당 10개 뽑기
            numIsOverTen = false;
        }

        // category 항목 별 테이블 조회
        for(String categoryName : category) {
            // categoryName에 해당하는 테이블 조회
            // select all로 전체 조회해서 가져오기

        }

        // 받아온 위도X, 경도Y
        /*
        장소의 갯수 : 4개 선택
        원하는 분류 : 명소, 문화, 쇼핑
        >>>
    명소 : 4개
문화 : 4개
쇼핑 : 4개
>>>
사용자가 코스를 짜게 하자.
지도 + 목록
1) 명소 2
2) 문화 3
3) 명소 1
        * */


        return recommendList;
    }

    @GetMapping("/recommendLocation")
    public List<ResultRecommendTest> recommendLocation(
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

        List<ResultRecommendTest> resultRecommendTestList = new ArrayList<>();
        // 쿼리 조회하는 부분 필요

        if (attractions > 0){
            // 해당 테이블 조회해서 해당 숫자만큼 해당 주소 영역의 row를 추출하여 리스트에 더해줌
            resultRecommendTestList.add(new ResultRecommendTest("관광거리1"));
            resultRecommendTestList.add(new ResultRecommendTest("관광거리2"));
        }
        if (sights > 0){
            // 해당 테이블 조회해서 해당 숫자만큼 해당 주소 영역의 row를 추출하여 리스트에 더해줌
            resultRecommendTestList.add(new ResultRecommendTest("명소1"));
            resultRecommendTestList.add(new ResultRecommendTest("명소2"));
            resultRecommendTestList.add(new ResultRecommendTest("명소3"));
        }

        return resultRecommendTestList;
    }
}
