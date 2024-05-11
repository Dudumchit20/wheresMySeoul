package awes.service;

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
}