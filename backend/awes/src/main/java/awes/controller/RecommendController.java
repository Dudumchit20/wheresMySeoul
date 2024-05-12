package awes.controller;

import awes.entity.*;
import awes.model.ResultRecommend;
import awes.model.ResultRecommendTest;
import awes.service.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class RecommendController {

    private final TbSebcTourStreetKorService tbSebcTourStreetKorService;
    private final TbVwAttractionsService tbVwAttractionsService;
    private final TbVwEntertainmentService tbVwEntertainmentService;
    private final TbVwShoppingService tbVwShoppingService;
    private final TbVwNatureService tbVwNatureService;
    private final TbVwRestaurantsService tbVwRestaurantsService;
    private final TbTourInformationService tbTourInformationService;

    List<String> defaultCategory = Arrays.asList("관광거리", "명소", "문화", "쇼핑", "자연", "음식", "외국인");
    boolean numIsOverTen = false;

    public RecommendController(TbSebcTourStreetKorService tbSebcTourStreetKorService,
                               TbVwAttractionsService tbVwAttractionsService,
                               TbVwEntertainmentService tbVwEntertainmentService,
                               TbVwShoppingService tbVwShoppingService,
                               TbVwNatureService tbVwNatureService,
                               TbVwRestaurantsService tbVwRestaurantsService,
                               TbTourInformationService tbTourInformationService
    ) {
        this.tbSebcTourStreetKorService = tbSebcTourStreetKorService;
        this.tbVwAttractionsService = tbVwAttractionsService;
        this.tbVwEntertainmentService = tbVwEntertainmentService;
        this.tbVwShoppingService = tbVwShoppingService;
        this.tbVwNatureService = tbVwNatureService;
        this.tbVwRestaurantsService = tbVwRestaurantsService;
        this.tbTourInformationService = tbTourInformationService;
    }

    @GetMapping("/recommend")
    public ResultRecommend resultRecommendList(
           // @RequestParam(value = "address", defaultValue = "중구") String address,
            @RequestParam(value="latitude", defaultValue = "0") double latitude,
            @RequestParam(value="longitude", defaultValue = "0") double longitude,
            @RequestParam(value="num", defaultValue = "0") int num,
            //@RequestParam(value="category") List<String> category
            @RequestParam(value = "category", defaultValue = "관광거리,명소,문화,쇼핑,자연,음식,외국인") String categorys

    ){
        ResultRecommend resultRecommend = new ResultRecommend();
        List<String> category = Arrays.asList(categorys.split(","));

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
                    break;
                case "명소":
                    // 명소 테이블 조회
                    List<TbVwAttractions> tbVwAttractions =tbVwAttractionsService.findNearby(latitude, longitude, num);
                    resultRecommend.setAttractions(tbVwAttractions);
                    System.out.println(tbVwAttractions);
                    break;
                case "문화":
                    // 문화 테이블 조회
                    List<TbVwEntertainment> tbVwEntertainments = tbVwEntertainmentService.findNearby(latitude, longitude, num);
                    resultRecommend.setEntertainment(tbVwEntertainments);
                    System.out.println(tbVwEntertainments);
                    break;
                case "쇼핑":
                    // 쇼핑 테이블 조회
                    List<TbVwShopping> tbVwShoppings = tbVwShoppingService.findNearby(latitude, longitude, num);
                    resultRecommend.setShoppings(tbVwShoppings);
                    System.out.println(tbVwShoppings);
                    break;
                case "자연":
                    // 자연 테이블 조회
                    List<TbVwNature> tbVwNatures = tbVwNatureService.findNearby(latitude, longitude, num);
                    resultRecommend.setNature(tbVwNatures);
                    System.out.println(tbVwNatures);
                    break;
                case "음식":
                    // 음식 테이블 조회
                    List<TbVwRestaurants> tbVwRestaurants = tbVwRestaurantsService.findNearby(latitude, longitude, num);
                    resultRecommend.setRestaurants(tbVwRestaurants);
                    System.out.println(tbVwRestaurants);
                    break;
                case "외국인":
                    // 외국인 테이블 조회
                    List<TbTourInformation> tbTourInformations = tbTourInformationService.findNearby(latitude, longitude, num);
                    resultRecommend.setTourInformations(tbTourInformations);
                    System.out.println(tbTourInformations);
                    break;
                default:
                    // 처리할 categoryName이 없는 경우
                    // 예외 처리 또는 기본 동작을 수행하는 코드 작성
                    System.out.println("해당되는 항목 없음");
                    break;
            }

        }

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
