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
}
