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
}
