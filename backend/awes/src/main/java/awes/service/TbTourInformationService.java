package awes.service;

import awes.entity.TbSebcTourStreetKor;
import awes.entity.TbTourInformation;
import awes.repository.TbTourInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbTourInformationService {

    @Autowired
    private TbTourInformationRepository repository;

    public List<TbTourInformation> findAll() {
        return repository.findAll();
    }

    public List<TbTourInformation> findByAddress(String address) {
        List<TbTourInformation> items = repository.findAll();
        return items.stream()
                .filter(item -> item.getAddress()!= null && item.getAddress().contains(address))
                .collect(Collectors.toList());
    }

    public List<TbTourInformation> findNearby(double latitude, double longitude,  int num) {
        // num이 10 이상인지 체크해두기
        List<TbTourInformation> items = null;
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
