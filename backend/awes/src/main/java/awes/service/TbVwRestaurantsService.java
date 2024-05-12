package awes.service;

import awes.entity.TbVwNature;
import awes.entity.TbVwRestaurants;
import awes.entity.TbVwShopping;
import awes.repository.TbVwRestaurantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbVwRestaurantsService {

    @Autowired
    private TbVwRestaurantsRepository repository;

    public List<TbVwRestaurants> findAll() {
        //return repository.findAll();
        List<TbVwRestaurants> items = repository.findAll();
        // 예를 들어, 여기에서 언어 항목만 필터링하는 로직을 추가할 수 있습니다.
        return items.stream()
                .filter(item -> "ko".equals(item.getLanguage()))
                .collect(Collectors.toList());
    }
    public List<TbVwRestaurants> findByLanguageAndAddress(String language, String address) {
        List<TbVwRestaurants> items = repository.findAll();
        return items.stream()
                .filter(item -> language.equals(item.getLanguage()))
                .filter(item -> item.getNewAddress() != null && item.getNewAddress().contains(address))
                .collect(Collectors.toList());
    }

    public List<TbVwRestaurants> findNearby(double latitude, double longitude, int num) {
        // num이 10 이상인지 체크해두기
        List<TbVwRestaurants> items = null;
        if(num >=10){
            // num이 10개 이상이어서 10으로 올 때
            // 각 항목 당 모두 조회
            items = repository.findAllNearby(latitude, longitude);
            System.out.println("서비스 : 10개 이상");

        } else if (num<10) {
            // num이 10개 미만일 때
            // 각 항목당 n개 뽑기
            // native query 작성
            items = repository.findTopNNearby(latitude, longitude, num);
            System.out.println("서비스 : n개");
        }
        return items;
    }
}