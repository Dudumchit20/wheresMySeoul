package awes.service;

import awes.entity.TbSebcTourStreetKor;
import awes.entity.TbVwAttractions;
import awes.entity.TbVwShopping;
import awes.repository.TbSebcTourStreetKorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbSebcTourStreetKorService {

    @Autowired
    private TbSebcTourStreetKorRepository repository;

    public List<TbSebcTourStreetKor> findAll() {
        return repository.findAll();
    }

    public List<TbSebcTourStreetKor> findByAddress(String address) {
        List<TbSebcTourStreetKor> items = repository.findAll();
        return items.stream()
                .filter(item -> item.getLotAddress()!= null && item.getLotAddress().contains(address))
                .collect(Collectors.toList());
    }
}
