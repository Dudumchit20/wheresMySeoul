package awes.service;

import awes.entity.TbVwNature;
import awes.repository.TbVwNatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TbVwNatureService {

    @Autowired
    private TbVwNatureRepository repository;

    public List<TbVwNature> findAll() {
        //return repository.findAll();
        List<TbVwNature> items = repository.findAll();
        // 예를 들어, 여기에서 언어 항목만 필터링하는 로직을 추가할 수 있습니다.
        return items.stream()
                .filter(item -> "ko".equals(item.getLanguage()))
                .collect(Collectors.toList());
    }
}