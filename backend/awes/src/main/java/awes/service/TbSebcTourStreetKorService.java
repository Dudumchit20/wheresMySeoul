package awes.service;

import awes.entity.TbSebcTourStreetKor;
import awes.repository.TbSebcTourStreetKorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TbSebcTourStreetKorService {

    @Autowired
    private TbSebcTourStreetKorRepository repository;

    public List<TbSebcTourStreetKor> findAll() {
        return repository.findAll();
    }
}
