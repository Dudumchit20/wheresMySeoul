package awes.service;

import awes.entity.TbVwAttractions;
import awes.repository.TbVwAttractionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TbVwAttractionsService {

    @Autowired
    private TbVwAttractionsRepository repository;

    public List<TbVwAttractions> findAll() {
        return repository.findAll();
    }
}
