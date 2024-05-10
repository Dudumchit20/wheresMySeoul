package awes.service;

import awes.entity.TbTourInformation;
import awes.repository.TbTourInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TbTourInformationService {

    @Autowired
    private TbTourInformationRepository repository;

    public List<TbTourInformation> findAll() {
        return repository.findAll();
    }
}
