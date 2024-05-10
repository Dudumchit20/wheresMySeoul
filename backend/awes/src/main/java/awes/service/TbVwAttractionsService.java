package awes.service;

import awes.entity.TbVwAttractions;
import awes.entity.TbVwShopping;
import awes.repository.TbVwAttractionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbVwAttractionsService {

    @Autowired
    private TbVwAttractionsRepository repository;

    public List<TbVwAttractions> findAll() {
        return repository.findAll();
    }

    public List<TbVwAttractions> findByLanguageAndAddress(String language, String address) {
        List<TbVwAttractions> items = repository.findAll();
        return items.stream()
                .filter(item -> language.equals(item.getLanguage()))
                .filter(item -> item.getNewAddress() != null && item.getNewAddress().contains(address))
                .collect(Collectors.toList());
    }
}
