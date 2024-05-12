package awes.repository;

import awes.entity.TbSebcTourStreetKor;
import awes.entity.TbVwEntertainment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbVwEntertainmentRepository extends JpaRepository<TbVwEntertainment, String> {
}
