package awes.service;

import awes.entity.TbVwNature;
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
}

