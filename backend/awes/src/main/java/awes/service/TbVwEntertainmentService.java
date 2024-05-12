package awes.service;

import awes.entity.TbVwAttractions;
import awes.entity.TbVwEntertainment;
import awes.repository.TbVwEntertainmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbVwEntertainmentService {

    @Autowired
    private TbVwEntertainmentRepository repository;

    public List<TbVwEntertainment> findAll() {
        return repository.findAll();
    }

    public List<TbVwEntertainment> findByLanguageAndAddress(String language, String address) {
        List<TbVwEntertainment> items = repository.findAll();
        return items.stream()
                .filter(item -> language.equals(item.getLanguage()))
                .filter(item -> item.getNewAddress() != null && item.getNewAddress().contains(address))
                .collect(Collectors.toList());
    }

    public List<TbVwEntertainment> findNearby(double latitude, double longitude, int num) {
        // num이 10 이상인지 체크해두기
        List<TbVwEntertainment> items = null;
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
