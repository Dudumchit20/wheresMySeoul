package awes.repository;

import awes.entity.TbTourInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbTourInformationRepository extends JpaRepository<TbTourInformation, String> {
}
