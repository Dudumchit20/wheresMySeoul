package awes.service;

import awes.entity.TbVwNature;
import awes.entity.TbVwRestaurants;
import awes.entity.TbVwShopping;
import awes.repository.TbVwShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TbVwShoppingService {

    @Autowired
    private TbVwShoppingRepository repository;
    public List<TbVwShopping> findAll() {
        return repository.findAll();
    }
    public List<TbVwShopping> findByLanguageAndAddress(String language, String address) {
        List<TbVwShopping> items = repository.findAll();
        return items.stream()
                .filter(item -> language.equals(item.getLanguage()))
                .filter(item -> item.getNewAddress() != null && item.getNewAddress().contains(address))
                .collect(Collectors.toList());
    }

    public List<TbVwShopping> findNearby(double latitude, double longitude, int num) {
        // num이 10 이상인지 체크해두기
        List<TbVwShopping> items = null;
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

