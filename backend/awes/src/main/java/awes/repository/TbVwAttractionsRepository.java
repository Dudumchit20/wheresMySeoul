package awes.repository;

import awes.entity.TbVwAttractions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbVwAttractionsRepository extends JpaRepository<TbVwAttractions, String> {
}
