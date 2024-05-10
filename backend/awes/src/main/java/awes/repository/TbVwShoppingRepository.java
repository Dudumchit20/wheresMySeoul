package awes.repository;

import awes.entity.TbVwShopping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbVwShoppingRepository extends JpaRepository<TbVwShopping, Integer> {
}
