package awes.repository;

import awes.entity.TbVwNature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TbVwNatureRepository extends JpaRepository<TbVwNature, Integer> {
    List<TbVwNature> findByLanguageAndNewAddressContaining(String language, String address);
}