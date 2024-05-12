package awes.controller;

import awes.entity.TbSebcTourStreetKor;
import awes.model.ResultRecommend;
import awes.model.ResultRecommendTest;
import awes.service.TbSebcTourStreetKorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class RecommendController {

    private final TbSebcTourStreetKorService tbSebcTourStreetKorService;
    List<String> defaultCategory = Arrays.asList("관광거리", "명소", "문화", "쇼핑", "자연", "음식", "외국인");
    boolean numIsOverTen = false;

    public RecommendController(TbSebcTourStreetKorService tbSebcTourStreetKorService) {
        this.tbSebcTourStreetKorService = tbSebcTourStreetKorService;
    }

    @GetMapping("/recommend")
    public ResultRecommend resultRecommendList(
            @RequestParam(value = "address", defaultValue = "중구") String address,
            @RequestParam(value="latitude", defaultValue = "0") double latitude,
            @RequestParam(value="longitude", defaultValue = "0") double longitude,
            @RequestParam(value="num", defaultValue = "0") int num,
            @RequestParam(value="category") List<String> category
    ){
        ResultRecommend resultRecommend = new ResultRecommend();

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
            // 각 항목당 n개 뽑기
            numIsOverTen = false;
        }

        // category 항목 별 테이블 조회
        for(String categoryName : category) {
            // categoryName에 해당하는 테이블 조회
            // n에 해당하는 대로
            switch (categoryName) {
                case "관광거리":
                    // 관광거리 테이블 조회
                    List<TbSebcTourStreetKor> tbSebcTourStreetKors = tbSebcTourStreetKorService.findNearby(latitude, longitude, num);
                    resultRecommend.setTourStreetKor(tbSebcTourStreetKors);
                    System.out.println(tbSebcTourStreetKors);
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "명소":
                    // 명소 테이블 조회
                    //List<TbVwSights> sights = sightsRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "문화":
                    // 문화 테이블 조회
                    //List<TbVwCulture> cultures = cultureRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "쇼핑":
                    // 쇼핑 테이블 조회
                    //List<TbVwShopping> shoppings = shoppingRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "자연":
                    // 자연 테이블 조회
                    //List<TbVwNature> natures = natureRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "음식":
                    // 음식 테이블 조회
                    //List<TbVwFood> foods = foodRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                case "외국인":
                    // 외국인 테이블 조회
                    //List<TbVwForeigners> foreigners = foreignersRepository.findAll();
                    // 조회된 결과를 처리하는 코드 작성
                    break;
                default:
                    // 처리할 categoryName이 없는 경우
                    // 예외 처리 또는 기본 동작을 수행하는 코드 작성
                    System.out.println("해당되는 항목 없음");
                    break;
            }

        }

        // 받아온 위도Y, 경도X
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


        return resultRecommend;
    }

    //// 테스트용이었던 것
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
