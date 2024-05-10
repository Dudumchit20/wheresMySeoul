package awes.repository;

import awes.entity.TbVwNature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbVwNatureRepository extends JpaRepository<TbVwNature, Integer> {
}